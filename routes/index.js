'use strict';

const morgan = require('morgan');
const validatorMiddleware = require('../libs/express-validator');

const generalRouter = require('express').Router();

// generalRouter.use(morgan('dev'));
generalRouter.use(validatorMiddleware);

generalRouter.use('/api/v1', require('./mobileRouter'));
generalRouter.use('/adminApi/v1', require('./adminRouter'));

module.exports = generalRouter;