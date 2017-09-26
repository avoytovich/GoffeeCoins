'use strict';

const Coin = require('../../models/coin.model');
const { NOT_ENOUGHT_BONUSES } = require('../../constants/errors');
const { FORBIDDEN } = require('http-statuses');


module.exports = {

    async hasEnoughBonuses(userId, houseCoinsCount) {
        const unusedCoinsCount = await Coin.getUnusedCoinCount(userId);
        if (unusedCoinsCount < houseCoinsCount) {
            throw FORBIDDEN.createError(NOT_ENOUGHT_BONUSES);
        }
    }

};