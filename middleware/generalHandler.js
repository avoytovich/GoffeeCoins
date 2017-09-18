const HTTP_STATUSES = require('http-statuses');
const logger = require('../libs/logger');

module.exports = (ctrlHandler, options) => (req, res, next) => {
    const {body, params, query} = req;

    req.getValidationResult()
        .then(validationResult => {
            const errors = validationResult.array();
            if (errors && errors.length) throw errors;
            return ctrlHandler({body, params, query});
        })
        .then(data => {
            res.status(options.status || HTTP_STATUSES.OK.code)
                .json(data);
        })
        .catch(err => next(err));
};