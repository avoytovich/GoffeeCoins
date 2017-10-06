'use strict';

const BonusRequest = require('../../models/bonusRequest.model');
const Coin = require('../../models/coin.model');
const { BONUS_TYPES }  = require('../../constants');
const { COFFEEHOUSE }  = require('../../constants/errors');
const helpers = require('./bonusRequest.helpers');
const { FORBIDDEN } = require('http-statuses');


const bonusRequestApi = {

    createRequest({ body: { coffeeHouseID, type, count }, user }) {
        return helpers.checkHouse(coffeeHouseID)
            .then(house => {
                // await helpers.isInCoffeeHouseNow(user._id, house._id);
                if (user.isAdminInCoffeeHouse(coffeeHouseID)) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_USER);
                }
                if (type === BONUS_TYPES.FREE) {
                    return helpers.createFreeRequest(user, house);
                }
                count || (count = 1);
                return helpers.createCoinRequest(user._id, house, count);
            })
            .then(() => Coin.getUnusedCoinCount(user._id))
            .then(coins => {
                // createNote({});
                return { coins }
            });
    },

    getRequests({ params: { coffeeHouseID }, user }) {
        return helpers.checkHouse(coffeeHouseID)
            .then(() => {
                if (!user.isAdminInCoffeeHouse(coffeeHouseID)) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_ADMIN);
                }
                return BonusRequest.getRequests(coffeeHouseID);
            });
    },

    confirmRequest({ params: { requestID }, user }) {
        return helpers.getRequest(requestID, user)
            .then(request => request.confirm(user._id))
            .then(result => {});
    },

    rejectRequest({ params: { requestID }, user }) {
        return helpers.getRequest(requestID, user)
            .then(request => request.reject(user._id))
            .then(result => {});
    },

};

module.exports = bonusRequestApi;