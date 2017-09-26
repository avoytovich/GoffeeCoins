'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const BonusRequest = require('../../models/bonusRequest.model');
const { BONUS_TYPES }  = require('../../constants');
const { hasEnoughBonuses } = require('./bonusRequest.helpers');
const { NOT_FOUND } = require('http-statuses');

module.exports = {

    createRequest({ body: { coffeeHouseID, type, count }, user }) {
        return CoffeeHouse.findById(coffeeHouseID)
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError();
                }
                if (type === BONUS_TYPES.FREE) {
                    return hasEnoughBonuses(user._id, house.coins);
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
            })
    }
};