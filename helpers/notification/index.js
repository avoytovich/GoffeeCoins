'use strict';

const { NOTIFICATIONS: { KEYS } } = require('../../constants');
const { createNote, removeNote } = require('./notificationEngine');
const Promise = require('bluebird');

const publicMethods = {

    createFreeRequestNote(userID, request) {
        const noteForAdmin = {
            userID,
            key: KEYS.bonusRequestFree,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        };
        return createNote(noteForAdmin)
            .then(async result => {
                await removeNote(noteForAdmin);
                return result;
            });
    },

    createFreeRequestSentNote(request) {
        return createNote({
            userID: request.userID,
            key: KEYS.bonusRequestFreeSent,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        }, {
            mustSend: false,
        });
    },

    createCoinRequestNote(userID, request) {
        const noteForAdmin = {
            userID,
            key: KEYS.bonusRequestCoin,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        };
        return createNote(noteForAdmin)
            .then(async result => {
                await removeNote(noteForAdmin);
                return result;
            });
    },

    createCoinRequestSentNote(request) {
        return createNote({
            userID: request.userID,
            key: KEYS.bonusRequestCoinSent,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        }, {
            mustSend: false,
        });
    },

    createCoinRequestConfirmedNote(request) {
        return Promise.all([
            removeNote({
                userID: request.userID,
                key: KEYS.bonusRequestCoinSent,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
            createNote({
                key: KEYS.bonusRequestCoinConfirmed,
                userID: request.userID,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
        ]);
    },

    createCoinRequestRejectedNote(request) {
        return Promise.all([
            removeNote({
                userID: request.userID,
                key: KEYS.bonusRequestCoinSent,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
            createNote({
                key: KEYS.bonusRequestCoinRejected,
                userID: request.userID,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
        ]);
    },

    createFreeRequestConfirmedNote(request) {
        return Promise.all([
            removeNote({
                userID: request.userID,
                key: KEYS.bonusRequestFreeSent,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
            createNote({
                key: KEYS.bonusRequestFreeConfirmed,
                userID: request.userID,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
        ]);
    },

    createFreeRequestRejectedNote(request) {
        return Promise.all([
            removeNote({
                userID: request.userID,
                key: KEYS.bonusRequestFreeSent,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
            createNote({
                key: KEYS.bonusRequestFreeRejected,
                userID: request.userID,
                bonusRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
        ]);
    },

    createAdminRequestNote(request) {
        return createNote({
            key: KEYS.adminRequest,
            userID: request.userID,
            adminRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        });
    },

    createAdminRequestConfirmedNote(request) {
        return Promise.all([
            removeNote({
                key: KEYS.adminRequest,
                userID: request.userID,
                adminRequest: request._id,
                coffeeHouseID: request.coffeeHouseID,
            }),
            createNote({
                key: KEYS.adminRequestConfirmed,
                userID: request.userID,
                coffeeHouseID: request.coffeeHouseID,
            }, {
                mustSend: false,
            }),
        ]);
    },

    // if rejected
    removeAdminRequestNote(request) {
        return removeNote({
            key: KEYS.adminRequest,
            userID: request.userID,
            adminRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
        });
    },

    createFiredNote(userID, coffeeHouseID) {
        return createNote({
            key: KEYS.fired,
            userID,
            coffeeHouseID,
        }, {
            mustSend: false,
        });
    },

    createFriendRegisteredNote(userID, sender) {
        return createNote({
            userID,
            sender,
            key: KEYS.friendRegistered,
        });
    },

};

module.exports = publicMethods;
