'use strict';

const User = require('./../models/user.model.js');
const Visitor = require('./../models/visitor.model.js');

module.exports = {

    defaultFields: ['_id', 'name', 'coins', 'avatarUrl'],

    async getUser(userId) {
        return await User.getUser(userId);
    },

    async createVisit(userID, coffeeHouseID) {
        return await Visitor.create({ userID, coffeeHouseID });
    },

    async getVisitors (ids) {
        return await User.find({ _id: { $in: ids } })
            .select(this.defaultFields.join(' '));
    },
};