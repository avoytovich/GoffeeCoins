'use strict';

const adminRequestRouter = require('express').Router();
const Ctrl = require('./adminRequest.ctrl');
const Validations = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');


adminRequestRouter.post('/', (req, res, next) => {
    req.checkBody({
        userID: Validations.USER._id,
        coffeeHouseID: Validations.MONGOID,
    });
    next();
},responseHandler(Ctrl.create));

adminRequestRouter.get('/getSomething', (req, res, next) => {
    req.checkBody({
        userID: Validations.USER._id,
        coffeeHouseID: Validations.MONGOID,
    });
    next();
},responseHandler(Ctrl.getSomething));


module.exports = adminRequestRouter;