'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const Coin = require('../../models/coin.model');
const { BONUS_TYPES, REQUEST_STATUSES }  = require('../../constants');
const {
    COFFEEHOUSE: { NOT_ADMIN },
    REQUESTS: { HAS_BEEN_PROCESSED },
}  = require('../../constants/errors');
const helpers = require('./bonusRequest.helpers');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');


module.exports = {

    createRequest({ body: { coffeeHouseID, type, count }, user }) {
        const ctx = {};
        const self = this;
        return CoffeeHouse.findById(coffeeHouseID)
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError();
                }
                ctx.house = house;
                // return helpers.isInCoffeeHouseNow(user._id, house._id);
            })
            .then(() => {
                if (type === BONUS_TYPES.FREE) {
                    count = ctx.house.coins;
                    return helpers.hasEnoughBonuses(
                        user.coins,
                        ctx.house.coins
                    );
                }
                count || (count = 1);
            })
            .then(() => {
                if (type === BONUS_TYPES.FREE) {
                    return self.createFreeRequest(
                        coffeeHouseID,
                        count,
                        user._id,
                        ctx.house.admins[0]);
                }
                BonusRequest.create({
                    coffeeHouseID,
                    type,
                    count,
                    userID: user._id,
                });
            })
            .then(() => Coin.getUnusedCoinCount(user._id))
            .then(coins => ({ coins }));
    },

    createFreeRequest(coffeeHouseID, count, userID, coffeeHouseAdminID) {
        return BonusRequest.create({
            coffeeHouseID,
            count,
            userID,
            type: BONUS_TYPES.FREE
        }).then(request => {
            const promises = [];
            for (let i = 0; i <= count; i++) {
                promises.push({
                    coffeeHouseID,
                    userID,
                    coffeeHouseAdminID,
                });
            }
            return Promise.map(promises, item => Coin.create(item));
        });
    },

    getRequests({ params: { coffeeHouseID }, user }) {
        if (!user.isAdminInCoffeeHouse(coffeeHouseID)) {
            throw FORBIDDEN.createError(NOT_ADMIN);
        }
        return BonusRequest.getRequests(coffeeHouseID);
    },

    confirmRequest({ params: { requestID }, user }) {
        return this.getRequest(requestID, user)
            .then(request => request.confirm(user._id))
            .then(result => {});
    },

    rejectRequest({ params: { requestID }, user }) {
        return this.getRequest(requestID, user)
            .then(request => request.reject(user._id))
            .then(result => {});
    },

    getRequest(id, user) {
        return BonusRequest.findById(id)
            .then(request => {
                if (!request) {
                    throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw FORBIDDEN.createError(
                        HAS_BEEN_PROCESSED(request.status)
                    );
                }
                if (!user.isAdminInCoffeeHouse(request.coffeeHouseID)) {
                    throw FORBIDDEN.createError(NOT_ADMIN);
                }
                return request;
            });
    },

};