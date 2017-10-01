'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const { BONUS_TYPES }  = require('../../constants');
const { COFFEEHOUSE: { NOT_ADMIN } }  = require('../../constants/errors');
const {
    hasEnoughBonuses,
    isInCoffeeHouseNow
} = require('./bonusRequest.helpers');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');

module.exports = {

    createRequest({ body: { coffeeHouseID, type, count }, user }) {
        const ctx = {};
        return CoffeeHouse.findById(coffeeHouseID)
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError();
                }
                ctx.house = house;
                // return isInCoffeeHouseNow(user._id, house._id);
            })
            .then(() => {
                if (type === BONUS_TYPES.FREE) {
                    count = undefined;
                    return hasEnoughBonuses(user.coins, ctx.house.coins);
                }
                count || (count = 1);
            })
            .then(() => {
                BonusRequest.create({
                    coffeeHouseID,
                    type,
                    count,
                    userID: user._id
                });
            });
    },

    getRequests({ params: { coffeeHouseID }, user }) {
        if (!user.isAdminInCoffeeHouse(coffeeHouseID)) {
            throw FORBIDDEN.createError(NOT_ADMIN);
        }
        return BonusRequest.getRequests(coffeeHouseID);
    }
};