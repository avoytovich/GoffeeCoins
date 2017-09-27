'use strict';

const User = require('./../../models/user.model.js');
const ERRORS = require('../../constants/errors');
const { checkUserOnFirebase } = require('./../../helpers/auth.helper.js');
const { NOT_FOUND } = require('http-statuses');
const pick = require('lodash/pick');

const userApiMethods = {

    signup({ body }) {
        const data = pick(body, ['_id', 'name', 'avatarUrl', 'referalId']);
        return checkUserOnFirebase(data._id)
            .then(firebaseUser => {
                data.email = firebaseUser.email;
                return User.findById(data._id)
            })
            .then(user => {
                if (user) return user;
                return User.create(data);
            })
            .then(user => {
                user.createdAt = undefined;
                user.updatedAt = undefined;
                user.email = undefined;
                return {
                    user,
                    token: user.generateJWT()
                }
            });
    },

    login({ body: { _id } }) {
        return checkUserOnFirebase(_id)
            .then(firebaseUser => User.getUser(_id))
            .then(user => {
                if (!user) {
                    throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
                }
                return {
                    user,
                    token: user.generateJWT()
                }
            });
    },

    update({ user: { _id }, body: { name, avatarUrl } }) {
        return User.findByIdAndUpdate(_id, { name, avatarUrl }, { new: true });
    }
};

module.exports = userApiMethods;