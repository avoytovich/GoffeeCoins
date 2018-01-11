'use strict';

const logger = require('../../libs/logger');
const sendPushiOS = require('../../libs/apn');
const sendPushAndroid = require('../../libs/node-gcm');
const Note = require('../../models/notification.model.js');
const DeviceToken = require('../../models/deviceToken.model.js');
const Promise = require('bluebird');
const { NOTIFICATIONS: {
    KEYS, LANGUAGES, MESSAGES,
} } = require('../../constants');


function sendPush(token, data) {
    switch (token.length) {
        case 64: return sendPushiOS(token, data);
        case 152: return sendPushAndroid(token, data);
    }
}

function translate(note, lang) {
  note.body = getMessage(note, lang) || getMessage(note, LANGUAGES.UA);
  return note;
}

function createNote(data, { mustSend = true }) {
    return Note.create(data)
        .then(note => Note.getNote(note._id))
        .then(note => {
            if (mustSend) pushNotification(data.userID, note);
        });
}

function getMessage(data, lang) {
    switch (data.key) {
        case KEYS.bonusRequestFree:          return MESSAGES[lang].bonusRequestFree(data.sender.name);
        case KEYS.bonusRequestFreeConfirmed: return MESSAGES[lang].bonusRequestFreeConfirmed;
        case KEYS.bonusRequestFreeRejected:  return MESSAGES[lang].bonusRequestFreeRejected;
        case KEYS.bonusRequestCoin:          return MESSAGES[lang].bonusRequestCoin(data.sender.name);
        case KEYS.bonusRequestCoinConfirmed: return MESSAGES[lang].bonusRequestCoinConfirmed(data.bonusRequest.count);
        case KEYS.bonusRequestCoinRejected:  return MESSAGES[lang].bonusRequestCoinRejected;
        case KEYS.adminRequest:              return MESSAGES[lang].adminRequest(data.coffeeHouseID.name);
        case KEYS.friendRegistered:          return MESSAGES[lang].friendRegistered;
    }
}

function pushNotification(userID, note) {
    return DeviceToken.find({ userID })
        .then(tokens => {
            const lang = (tokens[0] && tokens[0].language) || LANGUAGES.UA;
            return Promise.join(
                tokens.map(item => item.token),
                getMessage(note, lang)
            );
        })
        .then(([tokens, body]) => {
            logger.log(body);
            Note.findByIdAndUpdate(note._id, { body }).then(() => {});
            const data = Object.assign({}, note, { body });
            return Promise.map(tokens, token => sendPush(token, data));
        })
        .then(response => {
            logger.info("Successfully sent message:", response);
        })
        .catch(error => {
            logger.error("Error sending message:", error);
        });
}

module.exports = { createNote, getMessage, translate };