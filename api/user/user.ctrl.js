'use strict';

const User = require('./../../models/user.model.js');
const logger = require('../../libs/logger');
const ERRORS = require('../../constants/errors');
const { checkUserOnFirebase } = require('./../../helpers/auth.helper.js');

const { NOT_FOUND } = require('http-statuses');
const { pick } = require('lodash');
const Promise = require('bluebird');

const userApiMethods = {
    /**
     * @api {post} /api/v1/user/ SignUp
     * @apiName SignUp
     * @apiDescription Save new user information created by firebase
     * @apiGroup Auth
     *
     * @apiParam {String} _id Users UID from firebase.
     * @apiParam {String} name Users Name.
     * @apiParam {String} avatarUrl avatar url link.
     * @apiParam {String} referalId referal id. (optional)
     *
     * @apiSuccess {Object} user User data object.
     * @apiSuccess {String} token  User access token (JWT).
     */
    signup({ body }) {
        const data  = pick(body, ['_id', 'name', 'avatarUrl', 'referalId']);
        return checkUserOnFirebase(data._id)
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
    /**
     * @api {post} /api/v1/user/login Login
     * @apiName Login
     * @apiDescription Used to get token
     * @apiGroup Auth
     *
     * @apiParam {String} _id Users UID from firebase.
     *
     * @apiSuccess {Object} user User data object.
     * @apiSuccess {String} token  User access token (JWT).
     */
    login({ body: { _id } }) {
        return checkUserOnFirebase(_id)
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
    /**
     * @api {get} /api/v1/user/ Get Me
     * @apiName Get Me
     * @apiDescription Get current user
     * @apiGroup User
     *
     * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
     *
     * @apiSuccess {Object} user User data object.
     */

    /**
     * @api {put} /api/v1/user/ Update Me
     * @apiName Update Me
     * @apiDescription Update current user information
     * @apiGroup User
     *
     * @apiHeader {String} Authorization User authorization token `JWT eyJhbGci...`
     *
     * @apiParam {String} name Users Name.
     * @apiParam {String} avatarUrl avatar url link.
     *
     * @apiSuccess {Object} user User data object.
     */
    update({ user: { _id }, body: { name, avatarUrl } }) {
        return User.findByIdAndUpdate(
            _id,
            { name, avatarUrl },
            { new: true }
        );
    }
};

module.exports = userApiMethods;