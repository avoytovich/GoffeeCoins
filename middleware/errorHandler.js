const logger = require('../libs/logger');
const {INTERNAL_SERVER_ERROR: SERVER_ERROR} = require('http-statuses');

module.exports = (err, req, res, next) => {
    logger.error(err.stack);

    if (Array.isArray(err)) err = err[0];

    const status = (err.httpStatus && err.httpStatus.code) || err.status || SERVER_ERROR.code;
    const message = (err.message && err.message.msg) || err.message || SERVER_ERROR.message;

    return res.status(status).json({
        message,
        success: false,
    });
};