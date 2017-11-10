'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const { param } = require('express-validator/check');
const responseHandler = require('../../middleware/responseHandler');
const notRequiredAuthorization = require('../../middleware/notRequiredAuthorization');
const passport = require('../../libs/passport');

const checkCoords = (req, res, next) => {
    req.checkQuery('lat').notEmpty().isFloat();
    req.checkQuery('lng').notEmpty().isFloat();
    req.sanitizeQuery('lat').toFloat();
    req.sanitizeQuery('lng').toFloat();
    next();
};


housesRouter.get('/coords',
    notRequiredAuthorization,
    checkCoords,
    responseHandler(housesCtrl.getHousesList)
);


housesRouter.get('/wifi',
    checkCoords,
    responseHandler(housesCtrl.wifiInfo)
);


housesRouter.get('/:coffeeHouseID',
    notRequiredAuthorization,
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.getHouse)
);


housesRouter.post('/discharge/:coffeeHouseID',
    passport.authenticate('jwt', { session: false }),
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.discharge)
);


module.exports = housesRouter;