'use strict';

const webRouter = require('express').Router();
const validatorMiddleware = require('../libs/express-validator');
const passport = require('../libs/passport');
const sessionMiddleware = require('../middleware/session');
const isAuthenticated = require('../middleware/isAuthenticated');
const morgan = require('../libs/morgan');

const housesRouter = require('../adminApi/coffeeHouse/coffeeHouse.router');
const adminRequestRouter = require('../adminApi/adminRequest/adminRequest.router');
const adminUserRouter = require('../adminApi/admin/admin.router');


webRouter.use(morgan('web'));
webRouter.use(validatorMiddleware);
webRouter.use(sessionMiddleware);
webRouter.use(passport.initialize());
webRouter.use(passport.session());
webRouter.use('/admin', adminUserRouter);
webRouter.use(isAuthenticated);
webRouter.use('/coffeeHouse', housesRouter);
webRouter.use('/adminRequest', adminRequestRouter);

module.exports = webRouter;