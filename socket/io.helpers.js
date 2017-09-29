'use strict';

const User = require('./../models/user.model');
const Visitor = require('./../models/visitor.model');
const BonusRequest = require('./../models/bonusRequest.model');
const { REQUEST_STATUSES } = require('../constants');
const Promise = require('bluebird');

const socketHelpers = {

    defaultFields: ['_id', 'name', 'coins', 'avatarUrl'],

    async getUser(userId, sock) {
        const user = await User.getUser(userId);
        Object.assign(sock, { user });
    },

    async createVisit(userID, coffeeHouseID, socket) {
        const currentVisit = await Visitor.create({ userID, coffeeHouseID });
        Object.assign(socket, { currentVisit });
    },

    getVisitors(ids) {
        return Promise.map(ids, id => {
            return User.getUser(id, socketHelpers.defaultFields.join(' '));
        });
    },

    getRequests(coffeeHouseID) {
        return BonusRequest.find({
            coffeeHouseID,
            status: REQUEST_STATUSES.CREATED
        }).populate('userID')
    }
};

module.exports = socketHelpers;