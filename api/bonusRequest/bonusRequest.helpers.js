'use strict';

const Visitor = require('../../models/visitor.model');
const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const Coin = require('../../models/coin.model');
const { createNote } = require('../../helpers/notification.helper');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');
const {
    BONUS_TYPES,
    REQUEST_STATUSES,
    NOTIFICATIONS
}  = require('../../constants');
const {
    BONUS_REQUESTS,
    REQUESTS,
    COFFEEHOUSE
} = require('../../constants/errors');


const bonusHelpers = {

    async isInCoffeeHouseNow(userID, houseID) {
        const lastVisit = await Visitor.getLastVisit(userID, houseID);
        if (lastVisit.exitTime) {
            throw FORBIDDEN.createError(BONUS_REQUESTS.NOT_IN);
        }
    },

    async checkHouse(coffeeHouseID) {
        const house = await CoffeeHouse.findById(coffeeHouseID);
        if (!house) {
            throw NOT_FOUND.createError(COFFEEHOUSE.NOT_FOUND);
        }
        return house;
    },

    createFreeRequest(user, house) {
        const ctx = {};
        if (user.coins < house.coins) {
            throw FORBIDDEN.createError(BONUS_REQUESTS.NOT_ENOUGHT_BONUSES);
        }
        return BonusRequest.create({
            coffeeHouseID: house._id,
            count: house.coins,
            userID: user._id,
            type: BONUS_TYPES.FREE
        }).then(request => {
            ctx.request = request;
            const query = {
                userID: user._id,
                usedTimestamp: {$exists: false}
            };
            return Coin.find(query)
                .sort({createdAt: 1})
                .limit(house.coins);
        }).then(coins => {
            return Promise.map(coins, coin => coin.update({
                $set: {
                    usedTimestamp: Date.now(),
                    usedCoffeeHouseID: house._id,
                }
            }))
        }).then(() => {
            return Promise.map(house.admins, admin => {
                /*return createNote({
                    key: NOTIFICATIONS.KEYS.bonusRequestFree,
                    userID: admin,
                    bonusRequest: ctx.request._id,
                    coffeeHouseID: house._id,
                    sender: ctx.request.userID,
                })*/
            })
        });
    },

    createCoinRequest(userID, house, count) {
        return BonusRequest.create({
            coffeeHouseID: house._id,
            count,
            userID,
        }).then(request => {
            return Promise.map(house.admins, admin => {
                /*return createNote({
                    key: NOTIFICATIONS.KEYS.bonusRequestCoin,
                    userID: admin,
                    bonusRequest: request._id,
                    coffeeHouseID: house._id,
                    sender: request.userID,
                })*/
            })
        });
    },

    getRequest(id, user) {
        return BonusRequest.findById(id)
            .then(async request => {
                if (!request) {
                    throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw FORBIDDEN.createError(
                        REQUESTS.HAS_BEEN_PROCESSED(request.status)
                    );
                }
                await bonusHelpers.checkHouse(request.coffeeHouseID);
                if (!user.isAdminInCoffeeHouse(request.coffeeHouseID)) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_ADMIN);
                }
                return request;
            });
    },

};

module.exports = bonusHelpers;