'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const Coin = require('../../models/coin.model');
const AdminRequest = require('../../models/adminRequest.model');
const { getHouseWithLastVisit } = require('./coffeeHouse.helpers');
const { createFiredNote } = require('../../helpers/notification');
//const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const { COFFEEHOUSE } = require('../../constants/errors');
const Promise = require('bluebird');
const logger = require('../../libs/logger');
const HttpError = require('./../../helpers/httpError.helper');


const housesApiMethods = {

    getHousesList({ query: { lng, lat }, user }) {
        return CoffeeHouse.getHousesByLocation({ lng, lat })
            .then(houses => {
                if (user) {
                    return Promise.map(houses, house => {
                        return getHouseWithLastVisit(user._id, house);
                    });
                }
                return houses;
            });
    },

    getHouse({ params: { coffeeHouseID }, user }) {
        return CoffeeHouse.findById(coffeeHouseID)
            .select('-wifi -admins -owner')
            .lean()
            .then(async house => {
                if (!house) throw HttpError.notFound();
                //if (!house) throw NOT_FOUND.createError();
                if (user) {
                    house = await getHouseWithLastVisit(user._id, house);
                    house.allCoinsCount = await Coin.count({
                        coffeeHouseID,
                        userID: user._id
                    });
                }
                return house;
            });
    },

    wifiInfo({ query: { lng, lat } }) {
        return CoffeeHouse.getWifiInfo({ lng, lat });
    },

    discharge({ params: { coffeeHouseID }, user }) {
        if (!user.isAdminInCoffeeHouse(coffeeHouseID)) {
            throw HttpError.forbidden(COFFEEHOUSE.NOT_ADMIN);
            //throw FORBIDDEN.createError(COFFEEHOUSE.NOT_ADMIN);
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
            }}),
            createFiredNote(user._id, coffeeHouseID)
        ).then(result => {});
    },
};

module.exports = housesApiMethods;