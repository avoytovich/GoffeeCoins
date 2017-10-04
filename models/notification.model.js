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
    sender: {
        type: mongoose.Schema.Types.Mixed
    },
    request: {
        type: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
}, Object.assign({}, modelOptions, {timestamps: false}));

const Note = mongoose.model(MODELS.NOTIFICATION, NoteSchema);

module.exports = Note;