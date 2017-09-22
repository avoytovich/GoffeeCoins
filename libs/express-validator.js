const { isURL } = require('validator');
const expressValidator = require('express-validator');

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
        }
    },
};

module.exports = expressValidator(options);