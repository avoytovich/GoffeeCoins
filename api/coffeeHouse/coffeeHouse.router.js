'use strict';

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');
const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');



module.exports = housesRouter;