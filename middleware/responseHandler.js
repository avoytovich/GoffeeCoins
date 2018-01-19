'use strict';

const { BAD_REQUEST, OK } = require('http-statuses');
const pick = require('lodash/pick');
const logger = require('../libs/logger');
const HttpError = require('./../helpers/httpError.helper');

module.exports = (ctrlHandler, options = {}) => (req, res, next) => {
    const ctx = pick(req, ['body', 'params', 'query', 'user']);
    const defaultResponse = {
        success: true,
        message: OK.message
    };

    req.getValidationResult()
        .then(validationResult => validationResult.array())
        .then(([error]) => {
            if (error) {
                throw HttpError.badRequest(error);
                //throw BAD_REQUEST.createError(error);
            }
        })
        .then(() => ctrlHandler(ctx))
        .then(data => {
            res.status(options.status || OK.code)
                .json(data || defaultResponse);
        })
        .catch(next);
};