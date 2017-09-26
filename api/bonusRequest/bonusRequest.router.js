'use strict';

const { CREATED } = require('http-statuses');
const _ = require('lodash');
const logger = require('../../libs/logger');
const bonusesRouter = require('express').Router();
const bonusesCtrl = require('./bonusRequest.ctrl');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');

bonusesRouter.post('/:coffeeHouseID', (req, res, next) => {
    req.checkParams({
        coffeeHouseID: VALIDATIONS.MONGOID
    });
    next();
}, generalHandler(bonusesCtrl.createRequest, { status: CREATED.code }));

module.exports = bonusesRouter;