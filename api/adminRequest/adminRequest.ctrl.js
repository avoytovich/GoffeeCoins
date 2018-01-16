'use strict';

const AdminRequest = require('../../models/adminRequest.model');
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
        return AdminRequest.adminRequests(user._id);
    },

};