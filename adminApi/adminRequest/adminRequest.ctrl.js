'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const { createAdminRequestNote } = require('../../helpers/notification');
const { FORBIDDEN } = require('http-statuses');
const { COFFEEHOUSE } = require('../../constants/errors');


module.exports = {

    create({ body: { coffeeHouseID, userID }, user }) {
        if (!user.isOwnerInCoffeeHouse(coffeeHouseID)) {
            throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
        }
        const data = {
            userID,
            coffeeHouseID,
            adminID: user._id,
        };
        return AdminRequest.create(data)
            .then(request => createAdminRequestNote(request))
            .then(() => {});
    },

    getSomething({ body: dataId  }) {

        return AdminRequest.find(dataId)
            .then(request => (request))
            .then(() => {});
    },

};