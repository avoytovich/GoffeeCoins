'use strict';

const mongoose = require('../libs/mongoose');
const { modelOptions, MODELS } = require('../constants/index');

const tokenSchema = new mongoose.Schema({
    _id: String,     //deviceUId
    token: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        ref: MODELS.USER
    }
}, modelOptions);

const DeviceToken = mongoose.model(MODELS.DEVICE_TOKEN, tokenSchema);

module.exports = DeviceToken;