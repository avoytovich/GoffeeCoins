'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    NOTIFICATIONS,
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
    sender: {
        type: String,
        ref: MODELS.USER,
    },
    text: {
        type: String,
        required: true,
    },
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
    },
    /*coffeeHouseAdminID: {
        type: String,
        ref: MODELS.USER,
    },*/
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

NoteSchema.statics.getNote = function (id) {
    return this.findById(id)
        .select('-userID')
        .populate('bonusRequest', 'count type')
        .populate('coffeeHouseID', 'name avatarUrl')
        .populate('sender', 'name avatarUrl')
        .populate('adminRequest', '_id')
        .then(note => {
            if (note.key === NOTIFICATIONS.KEYS.bonusRequestFree) {
                note.bonusRequest.count = undefined;
            }
            return note;
        })
};

const Note = mongoose.model(MODELS.NOTIFICATION, NoteSchema);

module.exports = Note;