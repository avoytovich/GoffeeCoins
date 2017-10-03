'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const { REQUEST_STATUSES } = require('../../constants');
const helpers = require('./adminRequest.helpers');

module.exports = {

    accept({ params: { requestID }, user }) {
        return helpers.getRequest(requestID, user._id)
            .then(request => {
                return helpers.acceptRequest(request, user);
            })
            .then(data => {});
    },

    decline({ params: { requestID }, user }) {
        return helpers.getRequest(requestID, user._id)
            .then(request => {
                return helpers.declineRequest(request);
            })
            .then(data => {});
    },

    adminPanel({ user }) {
        const query = {
            userID: user._id,
            status: {
                $in: [
                    REQUEST_STATUSES.CREATED,
                    REQUEST_STATUSES.ACCEPTED
                ]
            }
        };
        return AdminRequest.find(query)
            .populate('coffeeHouseID', 'name avatarUrl address status')
            .select('-adminID -userID');
    },

};