const HTTP_STATUSES = require('http-statuses');
const logger = require('../libs/logger');
const _ = require('lodash');

module.exports = (ctrlHandler, options = {}) => (req, res, next) => {
    const ctx = _.pick(req, ['body', 'params', 'query', 'user']);

    req.getValidationResult()
        .then(validationResult => validationResult.array())
        .then(errors => {
            if (errors && errors.length) {
                throw HTTP_STATUSES.BAD_REQUEST.createError(errors[0]);
            }
        })
        .then(() => ctrlHandler(ctx))
        .then(data => {
            res.status(options.status || HTTP_STATUSES.OK.code)
                .json(data);
        })
        .catch(next);
};