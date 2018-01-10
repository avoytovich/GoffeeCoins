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
    forgotPassword, resetPassword, activateOwner
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

    activateOwner({ body: { id, name, activationCode, password } }) {
        return activateOwner(id, name, activationCode, password);
    },

    updateOwner({ body }) {
        const data = pick(body, adminCtrl.fields.filter(item => {
            return item in body;
        }));

        return updateUser(body._id, { email: body.email }).then(fbuser => {
            return Admin.findByIdAndUpdate(body._id, {
                $set: data
            }, { new: true }).then(newAdmin => { 
                    return newAdmin;
            })
        }).catch(err => {
            throw BAD_REQUEST.createError(err.code || err.message);
        })
    },

    createOwner({ body: { email, name, avatarUrl } }) {
        const tempPassword = Crypto.randomBytes(16).toString('hex');
        const activationCode = Crypto.randomBytes(16).toString('hex');

        return getOrCreateAuthUser({ email, displayName: name, password: tempPassword, disabled: true, emailVerified: false }).then(fbuser => {
            return Admin.findById(fbuser.uid).then(admin => {
                if (admin) {
                    throw new Error('already-exist');
                } else {
                    return Admin.create({ _id: fbuser.uid, email, name, avatarUrl, activationCode, 'disabled.blocked': true });
                }
            })
        }).catch(err => {
            throw BAD_REQUEST.createError(err.code || err.message);
        }).then(admin => {
            return mailjet.sendEmail({
                type: 'join-owner',
                subject: 'Welcome to CoffeeCoin!',
                email,
                id: admin._id,
                productName: 'Coffee Coins',
                name: admin.name,
                action_url: 'http://localhost:4200/activate-owner?name=' + name + '&id=' + admin._id + '&code=' + admin.activationCode
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

    resetPassword({ body: { id, verificationCode, password } }) {
        return resetPassword(id, verificationCode, password);
    },

    remove({ params: { _id }, user }) {
        if (_id === String(user._id) || _id === GLOBAL_ADMIN.id) {
            throw FORBIDDEN.createError();
        }
        return Admin.findByIdAndUpdate(_id, {
            'disabled.removed': true,
            'disabled.disabled': true
        }, {
                new: true
            })
            .then(admin => removeUser(_id));   
    },

};

module.exports = adminCtrl;