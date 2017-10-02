'use strict';

const AdminRequest = require('../../models/adminRequest.model');
const CoffeeHouse = require('../../models/coffeeHouse.model');
const { REQUEST_STATUSES } = require('../../constants');
const ERRORS = require('../../constants/errors');
const { NOT_FOUND, FORBIDDEN, BAD_REQUEST } = require('http-statuses');
const Promise = require('bluebird');


const adminRequestApi = {

    acceptOrDecline({ body: { requestID, status }, user }) {
        const ctx = {};
        return AdminRequest.findById(requestID)
            .then(request => {
                if (!request) {
                    throw NOT_FOUND.createError();
                }
                if (request.status !== REQUEST_STATUSES.CREATED) {
                    throw FORBIDDEN.createError(
                        ERRORS.REQUESTS.HAS_BEEN_PROCESSED(request.status)
                    );
                }
                if (request.userID.toString() !== user._id.toString()) {
                    throw FORBIDDEN.createError(ERRORS.REQUESTS.NOT_FOR_YOU);
                }
                ctx.request = request;
                return CoffeeHouse.findById(request.coffeeHouseID);
            })
            .then(house => {
                if (!house) {
                    throw NOT_FOUND.createError(ERRORS.COFFEEHOUSE.NOT_FOUND);
                }
                switch (status) {

                    case REQUEST_STATUSES.ACCEPTED:
                        return adminRequestApi.accept(ctx.request, user);

                    case REQUEST_STATUSES.DECLINED:
                        return adminRequestApi.decline(ctx.request);

                    default: throw BAD_REQUEST.createError();
                }
            })
    },

    accept(request, user) {
        request.update({ status: REQUEST_STATUSES.ACCEPTED })
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
                })
            ));
    },

    decline(request) {
        request.update({ status: REQUEST_STATUSES.DECLINED })
    },

    adminPanel({ user: { _id } }) {
        return AdminRequest.getAdminData(_id);
    }
};

module.exports = adminRequestApi;