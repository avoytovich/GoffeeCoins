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
const socketHelpers = require('../../api/socket/io.helpers');
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

    async getVisitors({ params: { _id } }) {
        let visitors = await Visitor.find({
            coffeeHouseID: _id,
            exitTime: {$exists: false}
        });
        const visitorsId = visitors.map(visitor => visitor.userID);        
        return Promise.map(visitorsId, id => {
            return User.getUser(id, socketHelpers.defaultFields.join(' ')  + ' adminInCoffeeHouses');
        });
    },

    removeAdmin({ body: { coffeeHouseID, userID }, user }) {
        if (user.isOwnerInCoffeeHouse(coffeeHouseID)) {
            throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
        }
        const data = {
            userID,
            coffeeHouseID,
        };

        return Promise.join(
            User.findById(userID).then(user => {
                var index = user.adminInCoffeeHouses.indexOf(coffeeHouseID);
                if (index > -1) {
                    user.adminInCoffeeHouses.splice(index, 1);
                    return user.save();
                }
                return user;
            }),
            CoffeeHouse.findById(coffeeHouseID).then(coffeeHouse => {
                var index = coffeeHouse.admins.indexOf(userID);
                if (index > -1) {
                    coffeeHouse.admins.splice(index, 1);
                    return coffeeHouse.save();
                }
                return coffeeHouse;
            })
        ).then((updatedUser, coffeeHouse) => {
            return updatedUser[0];
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

    removeHouse({ params: { _id }, body, user }) {
        return checkHouse(_id)
            .then(house => {
                if (!user.isOwnerInCoffeeHouse(house._id) &&
                    !user.isGlobalAdmin()) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
                }

                return CoffeeHouse.findByIdAndRemove(_id);
            });
    }
};

module.exports = housesCtrl;