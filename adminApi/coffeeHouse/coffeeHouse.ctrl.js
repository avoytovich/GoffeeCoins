'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const Visitor = require('../../models/visitor.model');
const User = require('../../models/user.model');
const logger = require('../../libs/logger');
const { ADMIN_TYPES } = require('../../constants');
const { COFFEEHOUSE } = require('../../constants/errors');
const Promise = require('bluebird');
const pick = require('lodash/pick');
const { FORBIDDEN, NOT_FOUND } = require('http-statuses');
const { checkHouse } = require('../../api/bonusRequest/bonusRequest.helpers');
const { discharge } = require('../../api/coffeeHouse/coffeeHouse.ctrl');

const housesCtrl = {

    fields: [
        'name',
        'avatarUrl',
        'bannerUrls',
        'description',
        'coins',
        'location',
        'address',
        'socials',
        'wifi',
        'owner'
    ],

    createHouse({ body, user }) {
        if (user.type === ADMIN_TYPES.OWNER) {
            body.owner = user._id;
        }
        const data = pick(body, housesCtrl.fields);
        return CoffeeHouse.create(data);
    },

    getHouses({ user, query }) {
        const queryData = {
            internal: false
        };
        Object.assign(queryData, query);
        if (user.type === ADMIN_TYPES.OWNER) queryData.owner = user._id;
        return CoffeeHouse.find(queryData)
            .select('name avatarUrl status')
            .lean()
            .then(houses => Promise.map(houses, async house => {
                house.visitorsCount = await Visitor.count({
                    coffeeHouseID: house._id,
                    exitTime: {$exists: false}
                });
                return house;
            }));
    },

    getHouse({ params: { _id } }) {
        return CoffeeHouse.findById(_id, '+location')
            .populate('admins owner', 'name avatarUrl createdAt')
            .then(house => {
                if (!house) throw NOT_FOUND.createError();
                return house;
            })
    },

    updateHouse({ params: { _id }, body, user }) {
        return checkHouse(_id)
            .then(house => {
                if (!user.isOwnerInCoffeeHouse(house._id) &&
                    !user.isGlobalAdmin()) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
                }

                const data = pick(body, housesCtrl.fields.filter(item => {
                    return item in body;
                }));

                return CoffeeHouse.findByIdAndUpdate(_id, {
                    $set: data
                }, {
                    new: true
                });
            });
    },

    discharge({ body: { coffeeHouseID, userID } }) {
        return User.findById(userID)
            .then(user => discharge({
                user,
                params: { coffeeHouseID },
            }));
    },

};

module.exports = housesCtrl;