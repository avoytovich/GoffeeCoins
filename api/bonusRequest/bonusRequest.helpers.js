'use strict';

const Visitor = require('../../models/visitor.model');
const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const Coin = require('../../models/coin.model');

const { BONUS_TYPES, REQUEST_STATUSES }  = require('../../constants');
const {
    BONUS_REQUESTS: { NOT_ENOUGHT_BONUSES, NOT_IN },
    REQUESTS: { HAS_BEEN_PROCESSED },
    COFFEEHOUSE,
} = require('../../constants/errors');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');

const bonusHelpers = {

    async isInCoffeeHouseNow(userID, houseID) {
        const lastVisit = await Visitor.getLastVisit(userID, houseID);
        if (lastVisit.exitTime) {
            throw FORBIDDEN.createError(NOT_IN);
        }
    },

    async checkHouse(coffeeHouseID) {
        const house = await CoffeeHouse.findById(coffeeHouseID);
        if (!house) {
            throw NOT_FOUND.createError(COFFEEHOUSE.NOT_FOUND);
        }
        return house;
    },

    createFreeRequest(coffeeHouseID, count, user, coffeeHouseAdminID) {
        if (user.coins < count) {
            throw FORBIDDEN.createError(NOT_ENOUGHT_BONUSES);
        }
        return BonusRequest.create({
            coffeeHouseID,
            count,
            userID: user._id,
            type: BONUS_TYPES.FREE
        }).then(request => {
            return Coin.find({ userID: user._id })
                .sort({createdAt: 1})
                .limit(count);
            /*const promises = [];
            for (let i = 0; i < count; i++) {
                promises.push({
                    coffeeHouseID,
                    coffeeHouseAdminID,
                    userID: user._id,
                });
            }
            return Promise.map(promises, item => Coin.create(item));*/
        }).then(coins => Promise.map(coins, coin => coin.update({
            $set: {
                usedTimestamp: Date.now(),
                usedCoffeeHouseID: coffeeHouseID,
            }
        })));
    },

    getRequest(id, user) {
        return BonusRequest.findById(id)
            .then(async request => {
                if (!request) {
                    throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw FORBIDDEN.createError(
                        HAS_BEEN_PROCESSED(request.status)
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