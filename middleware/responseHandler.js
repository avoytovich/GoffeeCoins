'use strict';

const { BAD_REQUEST, OK } = require('http-statuses');
const pick = require('lodash/pick');
const logger = require('../libs/logger');

module.exports = (ctrlHandler, options = {}) => (req, res, next) => {
    const ctx = pick(req, ['body', 'params', 'query', 'user']);
    const defaultResponse = {
        success: true,
        message: OK.message
    };

    req.getValidationResult()
        .then(validationResult => validationResult.array())
        .then(errors => {
            if (errors && errors.length) {
                throw BAD_REQUEST.createError(errors[0]);
            }
        })
        .then(() => ctrlHandler(ctx))
        .then(data => {
            res.status(options.status || OK.code)
                .json(data || defaultResponse);
        })
        .catch(next);
};