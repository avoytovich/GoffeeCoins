'use strict';

const housesRouter = require('express').Router();
const housesCtrl = require('./coffeeHouse.ctrl');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');


module.exports = housesRouter;