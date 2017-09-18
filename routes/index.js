const express = require('express');
const generalRouter = express.Router();
const morgan = require('morgan');
const expressValidator = require('express-validator');

generalRouter.use(morgan('dev'));
generalRouter.use(expressValidator());

generalRouter.use('/api/v1', require('./mobileRouter'));
generalRouter.use('/adminApi/v1', require('./adminRouter'));

module.exports = generalRouter;