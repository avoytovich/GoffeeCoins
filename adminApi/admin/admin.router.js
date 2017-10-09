'use strict';

const adminRouter = require('express').Router();
const adminCtrl = require('./admin.ctrl');

const VALIDATIONS = require('../../constants/validations');
const passport = require('../../middleware/passport-jwt');
const responseHandler = require('../../middleware/responseHandler');




adminRouter.post('/login', (req, res, next) => {
    req.checkBody(pick(VALIDATIONS.USER, ['_id']));
    next();
}, responseHandler(adminCtrl.login));


adminRouter.use(passport.authenticate('jwt', { session: false }));

module.exports = adminRouter;