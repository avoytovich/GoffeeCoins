'use strict';

const User = require('../../models/user.model');
const Coin = require('../../models/coin.model');
const BonusRequest = require('../../models/bonusRequest.model');
const ERRORS = require('../../constants/errors');
const { DEFAULT_COIN_COUNT } = require('../../constants');
const { COFFEEHOUSE, OWNER_ADMIN } = require('../../constants/default');
const { checkUserOnFirebase } = require('../../helpers/auth.helper');
const { createFriendRegisteredNote } = require('../../helpers/notification');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const pick = require('lodash/pick');
const Promise = require('bluebird');


const userApiMethods = {

    signup({ body }) {
        const data = pick(body, ['_id', 'name', 'avatarUrl'/*, 'referalId'*/]);
        return checkUserOnFirebase(data._id)
            .then(firebaseUser => {
                data.email = firebaseUser.email;
                return User.getUser(data._id)
            })
            .then(async user => {
                if (user) return user;
                user = await User.create(data);
                /*if (user.referalId) {
                    createFriendRegisteredNote(user.referalId, user._id)
                }*/
                return User.getUser(user._id);
            })
            .then(user => ({
                user,
                token: user.generateJWT()
            }));
    },

    link({ body: { _id, referalID } }) {
        const query = {
            _id: new RegExp('^' + referalID)
        };
        return Promise.join(
            User.findById(_id),
            User.findOne(query)
        ).then(([user, referalUser]) => {
            if (!user || !referalUser) {
                throw NOT_FOUND.createError(ERRORS.USER.NOT_FOUND);
            }
            return Promise.join(
                user.update({
                    $set: {
                        referalId: referalUser._id
                    }
                }),
                createFriendRegisteredNote(referalUser._id, user._id)
            )
        }).then(([user, result]) => User.getUser(user._id));
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

    me({ user }) {
        return user;
    },

    update({ user: { _id }, body: { name, avatarUrl } }) {
        return User.findByIdAndUpdate(_id, { name, avatarUrl })
            .then(user => User.getUser(_id));
    },

    invited({ user: { _id } }) {
        return User.find({ referalId: _id })
            .select('name avatarUrl')
            .lean()
            .then(users => Promise.map(users, async user => {
                user.coins = await Coin.getUnusedCoinCount(user._id);
                return user;
            }));
    },

    getBonusForInvited({ params: { _id }, user }) {
        const ctx = {};
        return User.getUser(_id, '+referalId')
            .then(friend => {
                if (!friend) throw NOT_FOUND.createError();
                if (String(friend.referalId) !== String(user._id)) {
                    throw FORBIDDEN.createError(ERRORS.USER.NOT_INVITED);
                }
                if (friend.coins < DEFAULT_COIN_COUNT) {
                    throw FORBIDDEN.createError(
                        ERRORS.BONUS_REQUESTS.NOT_ENOUGHT_BONUSES
                    );
                }
                ctx.friend = friend;
                return Promise.join(
                    BonusRequest.create({
                        userID: user._id,
                        coffeeHouseID: COFFEEHOUSE._id,
                        count: DEFAULT_COIN_COUNT,
                    }),
                    BonusRequest.create({
                        userID: friend._id,
                        coffeeHouseID: COFFEEHOUSE._id,
                        count: DEFAULT_COIN_COUNT,
                    })
                );
            })
            .then(requests => Promise.map(requests, request => {
                return request.confirm(OWNER_ADMIN.id)
            }))
            .then(() => ctx.friend.update({ $unset: { referalId: 1 } }))
            .then(() => Coin.getUnusedCoinCount(user._id))
            .then(coins => ({ coins }));
    },
};

module.exports = userApiMethods;