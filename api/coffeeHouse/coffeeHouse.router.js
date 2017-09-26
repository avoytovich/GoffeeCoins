'use strict';

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');
const logger = require('../../libs/logger');
const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');

housesRouter.get('/coords', (req, res, next) => {
    req.checkQuery({
        lat: VALIDATIONS.HOUSES.coord,
        lng: VALIDATIONS.HOUSES.coord,
    });
    req.sanitizeQuery('lat').toFloat();
    req.sanitizeQuery('lng').toFloat();
    next();
}, generalHandler(housesCtrl.getHousesList));


housesRouter.get('/:_id', (req, res, next) => {
    req.checkParams({
        _id: VALIDATIONS.HOUSES._id
    });
    next();
}, generalHandler(housesCtrl.getHouse));


module.exports = housesRouter;