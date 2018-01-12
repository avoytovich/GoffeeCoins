'use strict';

const User = require('../../models/user.model');
const Admin = require('../../models/admin.model');
const Visitor = require('../../models/visitor.model');
const BonusRequest = require('../../models/bonusRequest.model');
const Promise = require('bluebird');

const socketHelpers = {

    defaultFields: ['_id', 'name', 'coins', 'createdAt', 'avatarUrl', 'coffeeHouseCoins'],

    async getUser(userId, sock) {
        let user = await User.getUser(userId);
        if (!user) user = await Admin.findById(userId);
        Object.assign(sock, { user });
    },

    async getUserByIdWithAdmins(userId) {
        let user = await User.getUser(userId);
        if (!user) user = await Admin.findById(userId);
        return user;
    },

    async createVisit(userID, coffeeHouseID, socket) {
        const currentVisit = await Visitor.create({ userID, coffeeHouseID });
        Object.assign(socket, { currentVisit });
    },

    getVisitorsWithAdmins(ids) {
        return Promise.map(ids, id => {
            return socketHelpers.getUserByIdWithAdmins(id);
        });
    },

    getVisitors(ids) {
        return Promise.map(ids, id => {
            return User.getUser(id, socketHelpers.defaultFields.join(' '));
        });
    },

    getRequests(coffeeHouseID) {
        return BonusRequest.getRequests(coffeeHouseID);
    },

    isAdmin(user, houseId) {
        if (user) {
            if (user.isAdminInCoffeeHouse) {
                return user.isAdminInCoffeeHouse(houseId);
            }
            if (user.isOwnerInCoffeeHouse) {
                return user.isGlobalAdmin() ||
                    user.isOwnerInCoffeeHouse(houseId);
            }
        }
        return false;
    },
};

module.exports = socketHelpers;