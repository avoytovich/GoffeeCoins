'use strict';

const sendPush = require('./sendPush');
// const { Messaging } = require('../../libs/firebase');
const logger = require('../../libs/logger');
const Note = require('../../models/notification.model.js');
const DeviceToken = require('../../models/deviceToken.model.js');
const Promise = require('bluebird');
const { NOTIFICATIONS: {
    TITLE,
    KEYS,
    LANGUAGES,
    MESSAGES,
} } = require('../../constants/index');


const privateMethods = {

    createNote(data) {
        return Note.create(data)
            .then(note => Note.getNote(note._id))
            .then(note => privateMethods.pushNotification(data.userID, note))
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

    stringifyNote(note) {
        if (note._id) note._id = note._id.toString();
        if (note.bonusRequest) note.bonusRequest._id = note.bonusRequest._id.toString();
        if (note.coffeeHouseID) note.coffeeHouseID._id = note.coffeeHouseID._id.toString();
        if (note.sender) note.sender._id = note.sender._id.toString();
        if (note.adminRequest) note.adminRequest._id = note.adminRequest._id.toString();

        if (note.bonusRequest) note.bonusRequest = JSON.stringify(note.bonusRequest);
        if (note.coffeeHouseID) note.coffeeHouseID = JSON.stringify(note.coffeeHouseID);
        if (note.sender) note.sender = JSON.stringify(note.sender);
        if (note.adminRequest) note.adminRequest = JSON.stringify(note.adminRequest);
        return note;
    },

    pushNotification(userID, note) {
        return DeviceToken.find({ userID })
            .then(tokens => {
                const lang = (tokens[0] && tokens[0].language) || LANGUAGES.UA;
                return Promise.join(
                    tokens.map(item => item.token),
                    privateMethods.getMessage(note, lang)
                );
            })
            .then(([tokens, message]) => {
                logger.log(message);
                Note.findByIdAndUpdate(note._id, {body: message}).then(() => {});
                const data = Object.assign({
                    title: TITLE,
                    body,
                }, note);
                return Promise.map(tokens, token => sendPush(token, data));
            })
            .then(response => {
                logger.info("Successfully sent message:", response);
            })
            .catch(error => {
                logger.error("Error sending message:", error);
            });
    },
};

module.exports = privateMethods;