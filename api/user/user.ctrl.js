'use strict';

const User = require('./user.model.js');
const logger = require('../../libs/logger');
const ERRORS = require('../../constants/errors');
const helpers = require('./user.helpers');

const { NOT_FOUND } = require('http-statuses');
const { pick } = require('lodash');
const Promise = require('bluebird');

const userApiMethods = {
  /**
   * @api {post} /user/signup Request User information
   * @apiName SignUp
   * @apiGroup User
   *
   * @apiParam {String} _id Users unique ID.
   * @apiParam {String} name Users Name.
   * @apiParam {String} avatarUrl avatar url link.
   * @apiParam {String} referalId referal id. (optional)
   *
   * @apiSuccess {Object} user User data object.
   * @apiSuccess {String} token  User access token (JWT).
   */
    signup({ body }) {
        const data  = pick(body, ['_id', 'name', 'avatarUrl', 'referalId']);
        return helpers.checkUserOnFirebase(data._id)
            .then(firebaseUser => {
                data.email = firebaseUser.email;
                return User.findById(data._id)
            })
            .then(user => {
                if (user) return user;
                user = new User(data);
                return user.save();
            })
            .then(user => {
                user.createdAt = undefined;
                user.updatedAt = undefined;
                return {
                    user,
                    token: user.generateJWT()
                }
            });
    },

    login({ body: { _id } }) {
        return helpers.checkUserOnFirebase(_id)
            .then(firebaseUser => User.findById(_id))
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