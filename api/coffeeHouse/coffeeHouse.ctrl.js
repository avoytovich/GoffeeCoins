'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const Coin = require('../../models/coin.model');
const AdminRequest = require('../../models/adminRequest.model');
const { getHouseWithLastVisit } = require('./coffeeHouse.helpers');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const { COFFEEHOUSE } = require('../../constants/errors');
const Promise = require('bluebird');
const logger = require('../../libs/logger');


const housesApiMethods = {

    getHousesList({ query: { lng, lat }, user: { _id } }) {
        return CoffeeHouse.getHousesByLocation({ lng, lat })
            .then(houses => {
                return Promise.map(houses, house => {
                    return getHouseWithLastVisit(_id, house);
                });
            });
    },

    getHouse({ params: { coffeeHouseID }, user: { _id: userID } }) {
        return CoffeeHouse.findById(coffeeHouseID)
            .select('-wifi -admins -owner')
            .lean()
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError();
                }
                return Promise.join(
                    getHouseWithLastVisit(userID, house),
                    Coin.count({ coffeeHouseID, userID })
                );
            })
            .then(([house, allCoinsCount]) => {
                house.allCoinsCount = allCoinsCount;
                return house;
            });
    },

    wifiInfo({ query: { lng, lat } }) {
        return CoffeeHouse.getWifiInfo({ lng, lat });
    },

    discharge({ query: { coffeeHouseID }, user }) {
        logger.log(user);
        if (!user.isAdminInCoffeeHouse(coffeeHouseID)) {
            throw FORBIDDEN.createError(COFFEEHOUSE.NOT_ADMIN);
        }
        return Promise.join(
            AdminRequest.remove({
                coffeeHouseID,
                userID: user._id
            }),
            user.update({$pull: {
                adminInCoffeeHouses: coffeeHouseID
            }}),
            CoffeeHouse.findByIdAndUpdate(coffeeHouseID, {$pull: {
                admins: user._id
            }})
        ).then(result => {});
    },
};

module.exports = housesApiMethods;