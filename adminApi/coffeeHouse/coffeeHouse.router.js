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


housesRouter.post('/discharge', (req, res, next) => {
    req.checkBody({
        coffeeHouseID: VALIDATIONS.MONGOID,
        userID: VALIDATIONS.USER._id,
    });
    next();
}, responseHandler(housesCtrl.discharge));


housesRouter.post('/remove-admin', (req, res, next) => {
    req.checkBody({
        coffeeHouseID: VALIDATIONS.MONGOID
    });
    next();
}, responseHandler(housesCtrl.removeAdmin));

housesRouter.route('/:_id')
    .all(param('_id').isMongoId())
    .get(responseHandler(housesCtrl.getHouse))
    .put((req, res, next) => {
        const validations = Object.assign({}, VALIDATIONS.COFFEEHOUSE);
        for (let i in validations) {
            validations[i].optional = true;
        }
        req.checkBody(validations);
        next();
    }, responseHandler(housesCtrl.updateHouse))
    .delete(responseHandler(housesCtrl.removeHouse));

housesRouter.route('/:_id/visitors')
    .all(param('_id').isMongoId())
    .get(responseHandler(housesCtrl.getVisitors));

housesRouter.route('/:_id/admins')
    .all(param('_id').isMongoId())
    .get(responseHandler(housesCtrl.getAdmins))

module.exports = housesRouter;