'use strict';

const Visitor = require('../../models/visitor.model');
const { BONUS_REQUESTS:
    { NOT_ENOUGHT_BONUSES, NOT_IN }
} = require('../../constants/errors');
const { FORBIDDEN } = require('http-statuses');


module.exports = {

    hasEnoughBonuses(userCoins, houseCoinsCount) {
        if (userCoins < houseCoinsCount) {
            throw FORBIDDEN.createError(NOT_ENOUGHT_BONUSES);
        }
    },

    async isInCoffeeHouseNow(userID, houseID) {
        const lastVisit = await Visitor.getLastVisit(userID, houseID);
        if (lastVisit.exitTime) {
            throw FORBIDDEN.createError(NOT_IN);
        }
    }

};