'use strict';

const { Messaging } = require('../libs/firebase');
const logger = require('../libs/logger');
const Note = require('../models/notification.model');
const DeviceToken = require('../models/deviceToken.model');
const Promise = require('bluebird');
const { NOTIFICATIONS: {
    TITLE,
    KEYS,
    LANGUAGES,
    MESSAGES,
} } = require('../constants');


const NoteHelper = {

    createNote(data) {
        return Note.create(data)
            .then(note => Note.getNote(note._id))
            .then(note => NoteHelper.pushNotification(data.userID, note))
    },

    createFreeRequestNote(userID, request) {
        return NoteHelper.createNote({
            userID,
            key: KEYS.bonusRequestFree,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        })
    },

    createCoinRequestNote(userID, request) {
        return NoteHelper.createNote({
            userID,
            key: KEYS.bonusRequestCoin,
            bonusRequest: request._id,
            coffeeHouseID: request.coffeeHouseID,
            sender: request.userID,
        })
    },

    getMessage(data, lang) {
        switch (data.key) {
            case KEYS.bonusRequestFree:          return MESSAGES[lang].bonusRequestFree(data.sender.name);
            case KEYS.bonusRequestFreeConfirmed: return MESSAGES[lang].bonusRequestFreeConfirmed;
            case KEYS.bonusRequestFreeRejected:  return MESSAGES[lang].bonusRequestFreeRejected;
            case KEYS.bonusRequestCoin:          return MESSAGES[lang].bonusRequestCoin(data.sender.name);
            case KEYS.bonusRequestCoinConfirmed: return MESSAGES[lang].bonusRequestCoinConfirmed(data.bonusRequest.count);
            case KEYS.bonusRequestCoinRejected:  return MESSAGES[lang].bonusRequestCoinRejected;
            case KEYS.adminRequest:              return MESSAGES[lang].adminRequest(data.coffeeHouseID.name);
        }
    },

    pushNotification(userID, note) {
        return DeviceToken.find({ userID })
            .then(tokens => {
                const lang = (tokens[0] && tokens[0].language) || LANGUAGES.UA;
                return Promise.map(
                    tokens.map(item => item.token),
                    NoteHelper.getMessage(note, lang)
                );
            })
            .then((tokens, message) => {
                note.update({
                    $set: {text: message}
                });
                const payload = {
                    notification: {
                        title: TITLE,
                        body: message,
                    },
                    data: note
                };
                return Messaging.sendToDevice(tokens, payload);
            })
            .then(response => {
                logger.info("Successfully sent message:", response);
            })
            .catch(error => {
                logger.error("Error sending message:", error);
            });
    },
};

module.exports = NoteHelper;
