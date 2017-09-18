const ERRORS = require('../constants/errors');
const logger = require('../libs/logger');

module.exports = (err, req, res) =>{
    if (err.childError) {
        logger.error(err.childError.stack);
    } else {
        logger.error(err.stack);
    }

    return res.status(err.status || 500).json({message: err.message || ERRORS.SERVER});
};