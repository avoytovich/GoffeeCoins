'use strict';

const { NOTIFICATIONS: { KEYS } } = require('../../constants');
const { createNote } = require('./notificationEngine');

const publicMethods = {

    createFreeRequestNote(userID, request) {
        return createNote({
            userID,
            key: KEYS.bonusRequestFree,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        })
    },

    createCoinRequestNote(userID, request) {
        return createNote({
            userID,
            key: KEYS.bonusRequestCoin,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        })
    },

    createCoinRequestConfirmedNote(request) {
        return createNote({
            key: KEYS.bonusRequestCoinConfirmed,
            userID: request.userID,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        })
    },

    createCoinRequestRejectedNote(request) {
        return createNote({
            key: KEYS.bonusRequestCoinRejected,
            userID: request.userID,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        })
    },

    createFreeRequestConfirmedNote(request) {
        return createNote({
            key: KEYS.bonusRequestFreeConfirmed,
            userID: request.userID,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        })
    },

    createFreeRequestRejectedNote(request) {
        return createNote({
            key: KEYS.bonusRequestFreeRejected,
            userID: request.userID,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        })
    },

    createAdminRequestNote(request) {
        return createNote({
            key: KEYS.adminRequest,
            userID: request.userID,
            adminRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        })
    },

    createFriendRegisteredNote(userID, sender) {
        return createNote({
            userID,
            sender,
            key: KEYS.friendRegistered,
        })
    },

};

module.exports = publicMethods;
