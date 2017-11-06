'use strict';

const expressValidator = require('express-validator');
const { isURL } = require('validator');
const { DEFAULT_ERROR } = require('../constants/errors');

const options = {

    errorFormatter(param, msg) {
        if (msg === DEFAULT_ERROR) {
            return `Invalid ${param}!`;
        }
        return msg;
    },

    customValidators: {
        isArrayOfUrls: val => {
            return Array.isArray(val) && val.every(item => isURL(item));
        },
        isLocation: val => {
            return Array.isArray(val) &&
                val.length === 2 &&
                val.every(item => typeof item === 'number');
        },
    },
};

module.exports = expressValidator(options);