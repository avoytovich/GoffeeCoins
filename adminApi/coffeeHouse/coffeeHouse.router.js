'use strict';

const housesRouter = require('express').Router();
const { param } = require('express-validator/check');
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');


housesRouter.route('/')
    .get(responseHandler(housesCtrl.getHouses))
    .post((req, res, next) => {
        req.checkBody(VALIDATIONS.COFFEEHOUSE);
        next();
    }, responseHandler(housesCtrl.createHouse));


housesRouter.route('/:_id')
    .all(param('_id').isMongoId())
    .get(responseHandler(housesCtrl.getHouse))
    .put((req, res, next) => {
        req.checkBody(VALIDATIONS.COFFEEHOUSE);
        next();
    }, responseHandler(housesCtrl.updateHouse));

module.exports = housesRouter;