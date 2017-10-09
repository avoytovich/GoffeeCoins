'use strict';

const adminRouter = require('express').Router();
const housesRouter = require('../adminApi/coffeeHouse/coffeeHouse.router');
const adminRequestRouter = require('../adminApi/adminRequest/adminRequest.router');
const adminUserRouter = require('../adminApi/admin/admin.router');


adminRouter.use('/admin', adminUserRouter);
adminRouter.use('/coffeeHouse', housesRouter);
adminRouter.use('/adminRequest', adminRequestRouter);

module.exports = adminRouter;