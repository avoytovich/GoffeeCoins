'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const { REQUEST_STATUSES } = require('../../constants');

module.exports = {

    create({ body: { coffeeHouseID, userID } }, user) {
        return AdminRequest.create({
            userID,
            coffeeHouseID,
            adminID: user._id,
        }).then(() => {});
    },

};