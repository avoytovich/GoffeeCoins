'use strict';

const noteRouter = require('express').Router();
const noteCtrl = require('./notification.ctrl');
const responseHandler = require('../../middleware/responseHandler');


noteRouter.get('/', responseHandler(noteCtrl.getNotes));


module.exports = noteRouter;