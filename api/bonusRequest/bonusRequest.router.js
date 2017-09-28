'use strict';

const { CREATED } = require('http-statuses');
const bonusesRouter = require('express').Router();
const bonusesCtrl = require('./bonusRequest.ctrl');
const { BONUS_TYPES } = require('../../constants');
const responseHandler = require('../../middleware/responseHandler');


bonusesRouter.post('/', (req, res, next) => {
    req.checkBody('coffeeHouseID').isMongoId();
    req.checkBody('type').isIn(Object.values(BONUS_TYPES));
    req.checkBody('count').optional().isInt();
    next();
}, responseHandler(bonusesCtrl.createRequest, { status: CREATED.code }));

module.exports = bonusesRouter;