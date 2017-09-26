'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const logger = require('../../libs/logger');
const { getHouseWithLastVisit } = require('./coffeeHouse.helpers');
const Promise = require('bluebird');
const { NOT_FOUND } = require('http-statuses');

module.exports = {

    createRequest({ params: { coffeeHouseID }, user: { _id } }) {
        const ctx = {};
        return CoffeeHouse.findById(coffeeHouseID)
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError();
                }
            })
    }
};