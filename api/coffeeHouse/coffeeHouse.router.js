'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const { param } = require('express-validator/check');
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


housesRouter.get('/:coffeeHouseID',
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.getHouse)
);


housesRouter.post('/discharge/:coffeeHouseID',
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.discharge)
);


module.exports = housesRouter;