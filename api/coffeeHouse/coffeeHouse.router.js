'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const responseHandler = require('../../middleware/responseHandler');


housesRouter.get('/coords', (req, res, next) => {
    req.checkQuery('lat').notEmpty().isFloat();
    req.checkQuery('lng').notEmpty().isFloat();
    req.sanitizeQuery('lat').toFloat();
    req.sanitizeQuery('lng').toFloat();
    next();
}, responseHandler(housesCtrl.getHousesList));

housesRouter.get('/wifi', (req, res, next) => {
    req.checkQuery('lat').notEmpty().isFloat();
    req.checkQuery('lng').notEmpty().isFloat();
    req.sanitizeQuery('lat').toFloat();
    req.sanitizeQuery('lng').toFloat();
    next();
}, responseHandler(housesCtrl.wifiInfo));


housesRouter.get('/:_id', (req, res, next) => {
    req.checkParams('_id').notEmpty().isMongoId();
    next();
}, responseHandler(housesCtrl.getHouse));


module.exports = housesRouter;