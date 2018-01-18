'use strict';

const logger = require('../libs/logger');
const { INTERNAL_SERVER_ERROR: SERVER_ERROR } = require('http-statuses');
const { isProduction } = require('../env');

module.exports = (err, req, res, next) => {
    if (Array.isArray(err)) err = err[0];

    const status = (err.httpStatus && err.httpStatus.code) || err.status || err.code || SERVER_ERROR.code;
    const message = (err.message && err.message.msg) || err.message || SERVER_ERROR.message;

    if (!isProduction) logger.error(message, err.stack);

    return res.status(status).json({
        message,
        key: err.key,
        success: false,
    });
};