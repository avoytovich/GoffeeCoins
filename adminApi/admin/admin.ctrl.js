'use strict';

const Admin = require('../../models/admin.model');
const Crypto = require('crypto');
const mailjet = require('../../libs/mailjet');
const pick = require('lodash/pick');
const {
    checkUserOnFirebase,
    getOrCreateAuthUser,
    setBlockForUser,
    removeUser,
    createUser,
    updateUser
} = require('../../helpers/auth.helper');
const {
    forgotPassword, resetPassword
} = require('./admin.helpers');

const ERRORS = require('../../constants/errors');
const { GLOBAL_ADMIN } = require('../../constants/default');
const { ADMIN_TYPES } = require('../../constants');
const { NOT_FOUND, FORBIDDEN, BAD_REQUEST } = require('http-statuses');
const Promise = require('bluebird');


const adminCtrl = {

    fields: [
        'name',
        'email'
    ],


    login({ body: { _id } }) {
        return checkUserOnFirebase(_id)
            .then(firebaseUser => Admin.findById(_id))
            .then(admin => {
                if (!admin) {
                    throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
                }
                return {
                    admin,
                    token: admin.generateJWT()
                }
            });
    },

    me({ user }) {
        return user;
    },

    updateOwner({ body }) {
        const data = pick(body, adminCtrl.fields.filter(item => {
            return item in body;
        }));

        return Admin.findByIdAndUpdate(body._id, {
            $set: data
        }, { new: true }).then(newAdmin => {
            if ('email' in body) {
                return updateUser(body._id, { email: body.email });
            } else {
                return newAdmin;
            }
        })
    },

    createOwner({ body: { email, name, avatarUrl } }) {
        const tempPassword = Crypto.randomBytes(12).toString('hex'); // 'password';

        return getOrCreateAuthUser({ email, displayName: name, password: tempPassword, emailVerified: true }).then(fbuser => {
            return Admin.findById(fbuser.uid).then(admin => {
                if (admin) {
                    throw BAD_REQUEST.createError('Owner already registered');
                } else {
                    return Admin.create({ _id: fbuser.uid, email, name, avatarUrl });
                }
            })
        }).then(admin => {
            return mailjet.sendEmail({
                type: 'forgot-password',
                subject: 'Set up a new password',
                email,
                verificationCode: admin.verificationCode,
                productName: 'Coffee Coins',
                name: admin.name,
                action_url: 'http://localhost:4200/reset-password?email=' + email + '&code=' + admin.verificationCode
            });
        });
    },

    owners() {
        return Admin.find({
            internal: false,
            'disabled.removed': false,
            type: ADMIN_TYPES.OWNER
        })
    },

    setBlock({ params: { _id }, body: { block }, user }) {
        if (_id === String(user._id) || _id === GLOBAL_ADMIN.id) {
            throw FORBIDDEN.createError();
        }
        return setBlockForUser(_id, block)
            .then(firebaseUser => Admin.findByIdAndUpdate(_id, {
                'disabled.blocked': block
            }, {
                    new: true
                }));
    },

    forgotPassword({ body: { email } }) {
        return forgotPassword(email);
    },

    resetPassword({ body: { code, email, password } }) {
        return resetPassword(email, code, password);
    },

    remove({ params: { _id }, user }) {
        if (_id === String(user._id) || _id === GLOBAL_ADMIN.id) {
            throw FORBIDDEN.createError();
        }
        return removeUser(_id)
            .then(firebaseUser => Admin.findByIdAndUpdate(_id, {
                'disabled.removed': true
            }, {
                    new: true
                }));
    },

};

module.exports = adminCtrl;