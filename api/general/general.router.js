'use strict';

const {
    REQUEST_STATUSES,
    BONUS_TYPES,
    NOTIFICATIONS,
    ERROR
} = require('../../constants');

const multipart = require('connect-multiparty');
const { readFileAndPutTos3, putFile } = require('../../helpers/file.helpers');

const generalRouter = require('express').Router();


generalRouter.get('/constants', (req, res) => res.json({
    REQUEST_STATUSES,
    BONUS_TYPES,
    LANGUAGES: NOTIFICATIONS.LANGUAGES,
    ERROR
}));

generalRouter.post('/file', multipart(), ({ files: { file } }, res) => {
    readFileAndPutTos3(file)
        .then(url => res.json({ url }));
});

module.exports = generalRouter;