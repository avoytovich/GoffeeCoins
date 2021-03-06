'use strict';

const Visitor = require('../../models/visitor.model');
const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const Coin = require('../../models/coin.model');
const {
    createCoinRequestNote,
    createFreeRequestNote,
    createCoinRequestSentNote,
    createFreeRequestSentNote,
} = require('../../helpers/notification');
//const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');
const {
    BONUS_TYPES,
    REQUEST_STATUSES,
}  = require('../../constants');
const {
    BONUS_REQUESTS,
    REQUESTS,
    COFFEEHOUSE
} = require('../../constants/errors');
const HttpError = require('./../../helpers/httpError.helper');


const bonusHelpers = {

    async isInCoffeeHouseNow(userID, houseID) {
        const lastVisit = await Visitor.getLastVisit(userID, houseID);
        if (lastVisit.exitTime) {
            throw HttpError.forbidden(BONUS_REQUESTS.NOT_IN);
            //throw FORBIDDEN.createError(BONUS_REQUESTS.NOT_IN);
        }
    },

    async checkHouse(coffeeHouseID) {
        const house = await CoffeeHouse.findById(coffeeHouseID);
        if (!house) {
            throw HttpError.notFound(COFFEEHOUSE.NOT_FOUND);
            //throw NOT_FOUND.createError(COFFEEHOUSE.NOT_FOUND);
        }
        return house;
    },

    createFreeRequest(user, house) {
        const ctx = {};
        if (user.coins < house.coins) {
            throw HttpError.forbidden(BONUS_REQUESTS.NOT_ENOUGHT_BONUSES);
            //throw FORBIDDEN.createError(BONUS_REQUESTS.NOT_ENOUGHT_BONUSES);
        }
        return BonusRequest.create({
            coffeeHouseID: house._id,
            count: house.coins,
            userID: user._id,
            type: BONUS_TYPES.FREE
        })
            .then(request => {
                ctx.request = request;
                const query = {
                    userID: user._id,
                    usedTimestamp: {$exists: false}
                };
                return Coin.find(query)
                    .sort({createdAt: 1})
                    .limit(house.coins);
            })
            .then(coins => {
                return Promise.map(coins, coin => coin.update({
                    $set: {
                        usedTimestamp: Date.now(),
                        usedCoffeeHouseID: house._id,
                    }
                }))
            })
            .then(() => createFreeRequestSentNote(ctx.request))
            .then(() => {
                return Promise.map(house.admins, userID => {
                    return createFreeRequestNote(userID, ctx.request)
                })
            });
    },

    createCoinRequest(userID, house, count) {
        return BonusRequest.create({
            coffeeHouseID: house._id,
            count,
            userID,
        }).then(request => {
            return Promise.join(
                createCoinRequestSentNote(request),
                Promise.map(house.admins, userID => {
                    return createCoinRequestNote(userID, request);
                })
            );
        });
    },

    getRequest(id, user) {
        return BonusRequest.findById(id)
            .then(async request => {
                if (!request) {
                    throw HttpError.notFound();
                    //throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw HttpError.forbidden(REQUESTS.HAS_BEEN_PROCESSED(request.status));
                    /*throw FORBIDDEN.createError(
                        REQUESTS.HAS_BEEN_PROCESSED(request.status)
                    );*/
                }
                await bonusHelpers.checkHouse(request.coffeeHouseID);
                if (!user.isAdminInCoffeeHouse(request.coffeeHouseID)) {
                    throw HttpError.forbidden(COFFEEHOUSE.NOT_ADMIN);
                    //throw FORBIDDEN.createError(COFFEEHOUSE.NOT_ADMIN);
                }
                return request;
            });
    },

};

module.exports = bonusHelpers;