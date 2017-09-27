'use strict';

const User = require('./../models/user.model.js');
const Visitor = require('./../models/visitor.model.js');

module.exports = {

    async getUser(userId) {
        return await User.getUser(userId);
    },

    async createVisit(userID, coffeeHouseID) {
        return await Visitor.create({ userID, coffeeHouseID });
    }
};