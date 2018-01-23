'use strict';

const noteRouter = require('express').Router();
const noteCtrl = require('./notification.ctrl');
const responseHandler = require('../../middleware/responseHandler');
const { LANGUAGES } = require('../../constants');


noteRouter.get('/', (req, res, next) => {
    req.checkQuery('lang').optional().isIn(LANGUAGES);
    next();
}, responseHandler(noteCtrl.getNotes));


module.exports = noteRouter;