'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    REQUEST_STATUSES,
    BONUS_TYPES
} = require('../constants/index');

const bonusRequestSchema = new mongoose.Schema({
    userID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
        required: true,
    },
    count: Number,
    status: {
        type: String,
        enum: Object.values(REQUEST_STATUSES),
        default: REQUEST_STATUSES.CREATED,
    },
    type: {
        type: String,
        enum: Object.values(BONUS_TYPES),
        default: BONUS_TYPES.COIN,
    },
}, modelOptions);

const BonusRequest = mongoose.model(MODELS.BONUS_REQUEST, bonusRequestSchema);

module.exports = BonusRequest;