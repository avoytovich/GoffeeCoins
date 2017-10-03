'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
} = require('../constants/index');

const NoteSchema = new mongoose.Schema({}, modelOptions);

const Note = mongoose.model(MODELS.NOTIFICATION, NoteSchema);

module.exports = Note;