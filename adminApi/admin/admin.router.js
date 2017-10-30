'use strict';

const adminRouter = require('express').Router();
const adminCtrl = require('./admin.ctrl');
const pick = require('lodash/pick');
const VALIDATIONS = require('../../constants/validations');
const passport = require('../../libs/passport');
const responseHandler = require('../../middleware/responseHandler');
const isAuthenticated = require('../../middleware/isAuthenticated');


adminRouter.post('/login',
    passport.authenticate('local'),
    responseHandler(adminCtrl.me)
);


adminRouter.use(isAuthenticated);

adminRouter.get('/', responseHandler(adminCtrl.me));


module.exports = adminRouter;