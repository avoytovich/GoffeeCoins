'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');


housesRouter.post('/default', responseHandler(housesCtrl.createDefault));
housesRouter.post('/visit', responseHandler(housesCtrl.createDefault));


module.exports = housesRouter;