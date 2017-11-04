'use strict';

const bonusRequestRouter = require('express').Router();
const Ctrl = require('./bonusRequest.ctrl');
const Validations = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');


bonusRequestRouter.get('/coffee/:_id?', (req, res, next) => {
    req.checkQuery('start').isNumeric();
    req.checkQuery('end').isNumeric();
    req.sanitizeQuery('start').toInt();
    req.sanitizeQuery('end').toInt();
    next();
}, responseHandler(Ctrl.coffeeAnalytics));


bonusRequestRouter.get('/paychart/:_id?', (req, res, next) => {
    req.checkQuery('start').isNumeric();
    req.checkQuery('end').isNumeric();
    req.sanitizeQuery('start').toInt();
    req.sanitizeQuery('end').toInt();
    next();
}, responseHandler(Ctrl.paychart));


module.exports = bonusRequestRouter;