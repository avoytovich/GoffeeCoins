'use strict';

const { Messaging } = require('../libs/firebase');
const logger = require('../libs/logger');
const Note = require('../models/notification.model');
const DeviceToken = require('../models/deviceToken.model');

const NotificationHelper = {

    createNote(key, data) {

    },

    pushNotification(userID, data) {
        return DeviceToken.find({ userID })
            .then(tokens => tokens.map(item => item.token))
            .then(tokens => Messaging.sendToDevice(tokens, data))
            .then(response => {
                logger.info("Successfully sent message:", response);
            })
            .catch(function(error) {
                logger.error("Error sending message:", error);
            });
    }
};

module.exports = NotificationHelper;
