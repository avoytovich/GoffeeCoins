'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const Visitor = require('../../models/visitor.model');
const AdminRequest = require('../../models/adminRequest.model');
const User = require('../../models/user.model');
const Admin = require('../../models/admin.model');
const logger = require('../../libs/logger');
const { ADMIN_TYPES, REQUEST_STATUSES } = require('../../constants');
const { COFFEEHOUSE } = require('../../constants/errors');
const Promise = require('bluebird');
const pick = require('lodash/pick');
const { FORBIDDEN, NOT_FOUND } = require('http-statuses');
const { checkHouse } = require('../../api/bonusRequest/bonusRequest.helpers');
const socketHelpers = require('../../api/socket/io.helpers');
const { discharge } = require('../../api/coffeeHouse/coffeeHouse.ctrl');
const { updateUserAdminField, updateOwnerField } = require('../../adminApi/coffeeHouse/coffeeHouse.helpers');

const housesCtrl = {

    fields: [
        'name',
        'admins',
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

        return CoffeeHouse.create(data).then((house) => {
            return Admin.findByIdAndUpdate(data.owner, { $addToSet: { coffeeHouseID: house._id } })
                .then(() => house);
        });
    },

    getHouses({ user, query }) {
        const queryData = {
            internal: false
        };
        Object.assign(queryData, query);
        if (user.type === ADMIN_TYPES.OWNER) queryData.owner = user._id;
        return CoffeeHouse.find(queryData)
            .select('name address createdAt avatarUrl status')
            .lean()
            .then(houses => Promise.map(houses, async house => {
                house.visitorsCount = await Visitor.count({
                    coffeeHouseID: house._id,
                    exitTime: { $exists: false }
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
            exitTime: { $exists: false }
        });
        const visitorsId = visitors.map(visitor => visitor.userID);
        return Promise.map(visitorsId, id => {
            return User.getUser(id, socketHelpers.defaultFields.join(' ') + ' adminInCoffeeHouses');
        });
    },

    getAdmins({ params: { _id } }) {
        // Get admins with requsets
        return AdminRequest.find({ coffeeHouseID: _id, status: REQUEST_STATUSES.CREATED })
            .then(requests => Promise.map(requests, request => User.findById(request.userID)))
            .then(requests => Promise.join(requests, User.find({ adminInCoffeeHouses: _id }).select('+createdAt')))
            .then(data => {
                return { admins: data[1], requests: data[0]};
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
            AdminRequest.remove(data),
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
        ).then((adminRequest) => {
            return adminRequest[1];
        })
    },

    updateHouse({ params: { _id }, body, user }) {
        const data = pick(body, housesCtrl.fields.filter(item => {
            return item in body;
        }));

        return checkHouse(_id)
            .then(house => {
                if (!user.isOwnerInCoffeeHouse(house._id) &&
                    !user.isGlobalAdmin()) {
                    throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
                }

                return CoffeeHouse.findByIdAndUpdate(_id, {
                    $set: data
                }, {
                        new: true
                    });
            })
            // .then(coffeeHouse => updateUserAdminField(['585e5f70ec82991168ae7a03'], coffeeHouse._id))
            .then(coffeeHouse => updateOwnerField(data.owner, _id));
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

                return Promise.join(
                    CoffeeHouse.findByIdAndRemove(_id),
                    Admin.find({ coffeeHouseID: _id })
                        .then(admins => Promise.map(admins, admin => {
                            var index = admin.coffeeHouseID.indexOf(_id);
                            if (index > -1) {
                                admin.coffeeHouseID.splice(index, 1);
                                return admin.save();
                            }
                            return admin;
                        }))
                ).then(data => {
                    return data[0];
                })
            });
    },

    uploadImage({ file }) {
        return Promise.resolve(file.location)        
    },
};

module.exports = housesCtrl;