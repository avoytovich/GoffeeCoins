'use strict';

const { CREATED } = require('http-statuses');
const bonusesRouter = require('express').Router();
const bonusesCtrl = require('./bonusRequest.ctrl');
const { BONUS_TYPES } = require('../../constants');
const generalHandler = require('../../middleware/generalHandler');


bonusesRouter.post('/', (req, res, next) => {
    req.checkBody('coffeeHouseID').isMongoId();
    req.checkBody('type').isIn(Object.values(BONUS_TYPES));
    req.checkBody('count').optional().isInt();
    next();
}, generalHandler(bonusesCtrl.createRequest, { status: CREATED.code }));

module.exports = bonusesRouter;