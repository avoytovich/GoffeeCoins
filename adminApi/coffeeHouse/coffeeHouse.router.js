'use strict';

const housesRouter = require('express').Router();
const { param } = require('express-validator/check');
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');
const { CREATED } = require('http-statuses');
const pick = require('lodash/pick');


housesRouter.route('/')
    .get(responseHandler(housesCtrl.getHouses))
    .post((req, res, next) => {
        req.checkBody(VALIDATIONS.COFFEEHOUSE);
        next();
    }, responseHandler(housesCtrl.createHouse, {
        status: CREATED.code
    }));


housesRouter.get('/owner/:_id', (req, res, next) => {
    req.checkParams(pick(VALIDATIONS.USER, '_id'));
    next();
}, responseHandler(housesCtrl.getHousesByOwner));


housesRouter.post('/discharge', (req, res, next) => {
    req.checkBody({
        coffeeHouseID: VALIDATIONS.MONGOID,
        userID: VALIDATIONS.USER._id,
    });
    next();
}, responseHandler(housesCtrl.discharge));


housesRouter.route('/:_id')
    .all(param('_id').isMongoId())
    .get(responseHandler(housesCtrl.getHouse))
    .put((req, res, next) => {
        req.checkBody(VALIDATIONS.COFFEEHOUSE);
        next();
    }, responseHandler(housesCtrl.updateHouse));


module.exports = housesRouter;