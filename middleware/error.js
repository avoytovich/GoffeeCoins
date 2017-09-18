const ERRORS = require('../constants/errors');
const logger = require('../libs/logger');

module.exports = (err, req, res, next) => {
    logger.error(err);
    logger.log(213);
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'upalo'
    });
};