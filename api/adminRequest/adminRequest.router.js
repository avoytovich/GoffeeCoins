'use strict';

const adminRequestRouter = require('express').Router();
const adminRequestCtrl = require('./adminRequest.ctrl');
const { REQUEST_STATUSES } = require('../../constants');
const generalHandler = require('../../middleware/generalHandler');

adminRequestRouter.post('/', (req, res, next) => {
    req.checkBody('requestID').isMongoId();
    req.checkBody('status').isIn(Object.values(REQUEST_STATUSES));
    next();
}, generalHandler(adminRequestCtrl.acceptOrDecline));

module.exports = adminRequestRouter;