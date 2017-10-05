'use strict';

const mongoose = require('../libs/mongoose');
const { modelOptions, MODELS, LANGUAGES } = require('../constants');

const tokenSchema = new mongoose.Schema({
    _id: String,     //deviceUId
    token: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        ref: MODELS.USER
    },
    language: {
        type: String,
        enum: LANGUAGES,
    },
}, modelOptions);

const DeviceToken = mongoose.model(MODELS.DEVICE_TOKEN, tokenSchema);

module.exports = DeviceToken;