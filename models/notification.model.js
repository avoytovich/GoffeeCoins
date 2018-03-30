'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions, MODELS, NOTIFICATIONS,
} = require('../constants');

const queryHelper = query => {
    return query
        .select('-userID')
        .populate('bonusRequest', 'count type')
        .populate('coffeeHouseID', 'name avatarUrl')
        .populate('sender', 'name avatarUrl')
        .sort({ createdAt: -1 })
        .limit(30)
        //.populate('adminRequest', '_id')
        .lean()
};

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
    title: {
        type: String,
        default: NOTIFICATIONS.TITLE,
    },
    body: {
        type: String,
        //required: true,
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
    return queryHelper(this.findById(id))
        .then(note => {
            if (note.key === NOTIFICATIONS.KEYS.bonusRequestFree) {
                note.bonusRequest.count = undefined;
            }
            return note;
        })
};

NoteSchema.statics.getNotes = function (userID) {
    return queryHelper(this.find({ userID }))
        .then(notes => notes.map(note => {
            if (note.key === NOTIFICATIONS.KEYS.bonusRequestFree) {
                note.bonusRequest.count = undefined;
            }
            return note;
        }));
};

const Note = mongoose.model(MODELS.NOTIFICATION, NoteSchema);

module.exports = Note;