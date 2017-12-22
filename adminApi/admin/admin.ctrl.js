'use strict';

const Admin = require('../../models/admin.model');
const {
    checkUserOnFirebase,
    blockUser,
    removeUser
} = require('../../helpers/auth.helper');
const {
    forgotPassword, resetPassword
} = require('./admin.helpers');

const ERRORS = require('../../constants/errors');
const { GLOBAL_ADMIN } = require('../../constants/default');
const { ADMIN_TYPES } = require('../../constants');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');


const adminCtrl = {

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

    createOwner({ body: { _id, email, name, avatarUrl } }) {
        return Admin.create({ _id, email, name, avatarUrl });
    },

    owners() {
        return Admin.find({
            internal: false,
            type: ADMIN_TYPES.OWNER
        })
    },

    block({ params: { _id }, user }) {
        if (_id === String(user._id) || _id === GLOBAL_ADMIN.id) {
            throw FORBIDDEN.createError();
        }
        return blockUser(_id)
            .then(firebaseUser => Admin.findByIdAndUpdate(_id, {
                'disabled.blocked': true
            }, {
                new: true
            }));
    },

    forgotPassword({ body: { email }}) {
        return forgotPassword(email);
    },

    resetPassword({ body: { code, email, password }}) {
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