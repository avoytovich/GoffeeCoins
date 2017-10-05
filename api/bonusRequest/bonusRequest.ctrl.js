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
                    return helpers.createFreeRequest(
                        coffeeHouseID,
                        house.coins,
                        user,
                        house.admins[0]
                    );
                }
                count || (count = 1);
                return BonusRequest.create({
                    coffeeHouseID,
                    type,
                    count,
                    userID: user._id,
                });
            })
            .then(() => Coin.getUnusedCoinCount(user._id))
            .then(coins => ({ coins }));
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