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


housesRouter.get('/:coffeeHouseID', (req, res, next) => {
    req.checkParams('coffeeHouseID').notEmpty().isMongoId();
    next();
}, responseHandler(housesCtrl.getHouse));


housesRouter.post('/discharge/:coffeeHouseID', (req, res, next) => {
    req.checkParams('coffeeHouseID').notEmpty().isMongoId();
    next();
}, responseHandler(housesCtrl.discharge));


module.exports = housesRouter;