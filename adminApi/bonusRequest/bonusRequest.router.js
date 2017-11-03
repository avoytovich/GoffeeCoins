'use strict';

const bonusRequestRouter = require('express').Router();
const Ctrl = require('./bonusRequest.ctrl');
const Validations = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');


bonusRequestRouter.get('/coffee', (req, res, next) => {

});