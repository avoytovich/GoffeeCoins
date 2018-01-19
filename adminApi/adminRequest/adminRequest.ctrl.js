'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const { createAdminRequestNote } = require('../../helpers/notification');
//const { FORBIDDEN } = require('http-statuses');
const { COFFEEHOUSE, REQUESTS } = require('../../constants/errors');
const HttpError = require('./../../helpers/httpError.helper');


module.exports = {

    create({ body: { coffeeHouseID, userID }, user }) {        
        if (!user.isOwnerInCoffeeHouse(coffeeHouseID) && !user.isGlobalAdmin()) {
            throw HttpError.forbidden(COFFEEHOUSE.NOT_OWNER);
            //throw FORBIDDEN.createError(COFFEEHOUSE.NOT_OWNER);
        }
        const data = {
            userID,
            coffeeHouseID,
        };
        return AdminRequest.findOne(data)
            .then(request => {
                if (request) {
                    throw HttpError.forbidden(REQUESTS.HAS_BEEN_PROCESSED(request.status));
                    /*throw FORBIDDEN.createError(
                        REQUESTS.HAS_BEEN_PROCESSED(request.status)
                    );*/
                }
                return AdminRequest.create(
                    Object.assign({ adminID: user._id }, data)
                );
            })
            .then(request => createAdminRequestNote(request))
            .then(() => {});
    },

    getSomething({ body: dataId  }) {

        return AdminRequest.find(dataId)
            .then(request => (request))
            .then(() => {});
    },

};