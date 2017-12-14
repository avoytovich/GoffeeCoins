'use strict';

const { CREATED } = require('http-statuses');
const pick = require('lodash/pick');
const userRouter = require('express').Router();
const userCtrl = require('./user.ctrl');
const VALIDATIONS = require('../../constants/validations');
const passport = require('../../libs/passport');
const responseHandler = require('../../middleware/responseHandler');


userRouter.get('/', responseHandler(userCtrl.getUsers));
userRouter.delete('/:_id', responseHandler(userCtrl.removeUser));


module.exports = userRouter;