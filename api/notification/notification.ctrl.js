'use strict';

const Note = require('../../models/notification.model');


const NoteCtrl = {

    getNotes({ user }) {
        return Note.getNotes(user._id);
    }
};

module.exports = NoteCtrl;