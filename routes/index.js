const express = require('express');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const generalRouter = express.Router();

const { DEFAULT_ERROR } = require('../constants/errors');

generalRouter.use(morgan('dev'));
generalRouter.use(expressValidator({
    errorFormatter (param, msg) {
        if (msg === DEFAULT_ERROR) {
            return `Invalid ${param}!`;
        }
        return msg;
    }
}));

generalRouter.use('/api/v1', require('./mobileRouter'));
generalRouter.use('/adminApi/v1', require('./adminRouter'));

module.exports = generalRouter;