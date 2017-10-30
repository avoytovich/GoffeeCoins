'use strict';

const webRouter = require('express').Router();
const housesRouter = require('../adminApi/coffeeHouse/coffeeHouse.router');
const adminRequestRouter = require('../adminApi/adminRequest/adminRequest.router');
const adminUserRouter = require('../adminApi/admin/admin.router');
const validatorMiddleware = require('../libs/express-validator');
const morgan = require('../libs/morgan');


webRouter.use(morgan('web'));
webRouter.use(validatorMiddleware);
webRouter.use('/admin', adminUserRouter);
webRouter.use('/coffeeHouse', housesRouter);
webRouter.use('/adminRequest', adminRequestRouter);

module.exports = webRouter;