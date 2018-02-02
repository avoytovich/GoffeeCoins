'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const { param } = require('express-validator/check');
const responseHandler = require('../../middleware/responseHandler');
const notRequiredAuth = require('../../middleware/notRequiredAuth');
const passport = require('../../libs/passport');

const checkCoords = (req, res, next) => {
    req.checkQuery('lat').notEmpty().isFloat();
    req.checkQuery('lng').notEmpty().isFloat();
    req.query.radius && req.checkQuery('radius').notEmpty().isFloat();
    req.sanitizeQuery('lat').toFloat();
    req.sanitizeQuery('lng').toFloat();
    req.query.radius && req.sanitizeQuery('radius').toFloat();
    next();
};


housesRouter.get('/coords',
    notRequiredAuth,
    checkCoords,
    responseHandler(housesCtrl.getHousesList)
);


housesRouter.get('/wifi',
    checkCoords,
    responseHandler(housesCtrl.wifiInfo)
);


housesRouter.get('/:coffeeHouseID',
    notRequiredAuth,
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.getHouse)
);


housesRouter.post('/discharge/:coffeeHouseID',
    passport.authenticate('jwt', { session: false }),
    param('coffeeHouseID').isMongoId(),
    responseHandler(housesCtrl.discharge)
);


module.exports = housesRouter;