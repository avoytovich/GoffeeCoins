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


const NotificationHelper = {

    createNote(data) {
        return Note.create(data)
            .then(note => {
                return NotificationHelper.pushNotification(data.userID, note)
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

    pushNotification(userID, data) {
        return DeviceToken.find({ userID })
            .then(tokens => {
                const lang = (tokens[0] && tokens[0].language) || LANGUAGES.UA;
                return Promise.map(
                    tokens.map(item => item.token),
                    NotificationHelper.getMessage(data, lang)
                );
            })
            .then(tokens => {
                const payload = {
                    notification: {
                        title: TITLE,
                        body: ''
                    },
                    data
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

module.exports = NotificationHelper;
