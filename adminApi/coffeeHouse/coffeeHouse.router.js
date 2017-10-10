'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');


housesRouter.route('/')
    .get(responseHandler(housesCtrl.getHouses))
    .post((req, res, next) => {
        req.checkBody({
        });
    }, responseHandler(housesCtrl.create));


housesRouter.post('/visit', responseHandler(housesCtrl.createDefault));

module.exports = housesRouter;