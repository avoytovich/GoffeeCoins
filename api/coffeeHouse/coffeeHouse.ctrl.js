'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const logger = require('../../libs/logger');
const Promise = require('bluebird');
const { getHouseWithLastVisit } = require('./coffeeHouse.helpers');

const housesApiMethods = {

    getHousesList({ query: { lng, lat }, user: { _id } }) {
        return CoffeeHouse.getHousesByLocation({ lng, lat })
            .then(houses => {
                return Promise.map(houses, house => {
                    return getHouseWithLastVisit(_id, house);
                });
            });
    },

    getHouse({ params: { _id: houseId }, user: { _id } }) {
        return CoffeeHouse.findById(houseId)
            .lean()
            .then(house => getHouseWithLastVisit(_id, house));
        // TODO get user coins count for this house
    }
};

module.exports = housesApiMethods;