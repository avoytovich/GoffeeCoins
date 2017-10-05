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



AdminRequest.create({
    adminID: '81Q5qFP73cNET3C6tfP9T4qLyQx1',
    userID: 'NYJVszMLdlUgq7j8IR4KRU4WRuJ3',
    coffeeHouseID: '59d501ef3063254f96dc5d5b',
});

AdminRequest.create({
    adminID: '81Q5qFP73cNET3C6tfP9T4qLyQx1',
    userID: 'NYJVszMLdlUgq7j8IR4KRU4WRuJ3',
    coffeeHouseID: '59c9d506ce0e011b6d53d0c9',
});