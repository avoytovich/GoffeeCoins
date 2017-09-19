'use strict';

const User = require('./user.model.js');
const logger = require('../../libs/logger');
const ERRORS = require('../../constants/errors');
const { checkUserOnFirebase } = require('./user.helpers');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');
const Promise = require('bluebird');

const userApiMethods = {

    signup({ body: { _id, email, name, avatarUrl, referalId } }) {
        return checkUserOnFirebase(_id)
            .then(firebaseUser => User.findById(_id))
            .then(user => {
                if (user) return user;
                user = new User({ _id, email, name, avatarUrl, referalId });
                return user.save();
            })
            .then(user => {
                user.createdAt = undefined;
                user.updatedAt = undefined;
                return {
                    user,
                    token: user.generateJWT()
                }
            })
    },

    login({ body: { _id } }) {
        return checkUserOnFirebase(_id)
            .then(firebaseUser => User.findById(_id))
            .then(user => {
                if (!user) {
                    throw HTTP_STATUSES.NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
                }
                return {
                    user,
                    token: user.generateJWT()
                }
            });
    }
};

module.exports = userApiMethods;