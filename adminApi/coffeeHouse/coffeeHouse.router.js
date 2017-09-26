'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');


housesRouter.post('/default', generalHandler(housesCtrl.createDefault));
housesRouter.post('/visit', generalHandler(housesCtrl.createDefault));


module.exports = housesRouter;