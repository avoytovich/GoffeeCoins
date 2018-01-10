'use strict';

const adminRequestRouter = require('express').Router();
const Ctrl = require('./adminRequest.ctrl');
const Validations = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');


adminRequestRouter.post('/', (req, res, next) => {
    req.checkBody({
        coffeeHouseID: Validations.MONGOID,
    });
    next();
},responseHandler(Ctrl.create));


module.exports = adminRequestRouter;