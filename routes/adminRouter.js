'use strict';

const adminRouter = require('express').Router();

const housesRoter = require('../adminApi/coffeeHouse/coffeeHouse.router');

adminRouter.use('/coffeeHouse', housesRoter);

module.exports = adminRouter;