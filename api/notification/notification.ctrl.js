'use strict';

const Note = require('../../models/notification.model');
const { translate } = require('../../helpers/notification/notificationEngine');
const { NOTIFICATIONS: { LANGUAGES } } = require('../../constants');

const NoteCtrl = {

    getNotes({ user, query: { lang = LANGUAGES.UA } }) {
        return Note.getNotes(user._id)
            .then(notes => {
                return notes.map(note => {
                    return translate(note, lang);
                });
            });
    }
};

module.exports = NoteCtrl;