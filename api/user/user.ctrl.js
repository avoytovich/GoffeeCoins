'use strict';

const User = require('../../models/user.model');
const Coin = require('../../models/coin.model');
const ERRORS = require('../../constants/errors');
const { checkUserOnFirebase } = require('../../helpers/auth.helper');
const { NOT_FOUND } = require('http-statuses');
const pick = require('lodash/pick');
const Promise = require('bluebird');

const userApiMethods = {

    signup({ body }) {
        const data = pick(body, ['_id', 'name', 'avatarUrl', 'referalId']);
        return checkUserOnFirebase(data._id)
            .then(firebaseUser => {
                data.email = firebaseUser.email;
                return User.getUser(data._id)
            })
            .then(user => {
                if (user) return user;
                return User.create(data);
            })
            .then(user => {
                user.createdAt = undefined;
                user.updatedAt = undefined;
                user.email = undefined;
                user.coins || (user._doc.coins = 0);
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
    },

    invited({ user: { _id } }) {
        return User.find({ referalId: _id })
            .lean()
            .then(users => Promise.map(users, async user => {
                user.coins = await Coin.getUnusedCoinCount(user._id);
                return user;
            }));
    }
};

module.exports = userApiMethods;