'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const CoffeeHouse = require('../../models/coffeeHouse.model');
const { checkHouse } = require('../bonusRequest/bonusRequest.helpers');
const {
    createAdminRequestConfirmedNote, removeAdminRequestNote
} = require('../../helpers/notification');
const { REQUEST_STATUSES } = require('../../constants');
const ERRORS = require('../../constants/errors');
const HttpError = require('./../../helpers/httpError.helper');
//const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const Promise = require('bluebird');


const adminRequestHelpers = {

    getRequest(requestID, userId) {
        return AdminRequest.findById(requestID)
            .then(async request => {
                if (!request) {
                    throw HttpError.notFound();
                    //throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw HttpError.forbidden(ERRORS.REQUESTS.HAS_BEEN_PROCESSED(request.status));
                    /*throw FORBIDDEN.createError(
                        ERRORS.REQUESTS.HAS_BEEN_PROCESSED(request.status)
                    );*/
                }
                if (String(request.userID) !== String(userId)) {
                    throw HttpError.forbidden(ERRORS.REQUESTS.NOT_FOR_YOU);
                    //throw FORBIDDEN.createError(ERRORS.REQUESTS.NOT_FOR_YOU);
                }
                await checkHouse(request.coffeeHouseID);
                return request;
            })
    },

    acceptRequest(request, user) {
        return request.update({ status: REQUEST_STATUSES.ACCEPTED })
            .then(() => Promise.join(
                user.update({
                    $addToSet: {
                        adminInCoffeeHouses: request.coffeeHouseID
                    }
                }),
                CoffeeHouse.findByIdAndUpdate(request.coffeeHouseID, {
                    $addToSet: {
                        admins: user._id
                    }
                }, {
                    new: true
                }),
                createAdminRequestConfirmedNote(request)
            ));
    },

    declineRequest(request) {
        return Promise.all([
            request.update({ status: REQUEST_STATUSES.DECLINED }),
            removeAdminRequestNote(request),
        ]);
    },

};

module.exports = adminRequestHelpers;