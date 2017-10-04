'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
} = require('../constants/index');

const NoteSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
    },
    coffeeHouseAdminID: {
        type: String,
        ref: MODELS.USER,
    },
    adminRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.ADMIN_REQUEST,
    },
    bonusRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.BONUS_REQUEST,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
}, Object.assign({}, modelOptions, {timestamps: false}));

const Note = mongoose.model(MODELS.NOTIFICATION, NoteSchema);

module.exports = Note;