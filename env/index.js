"use strict";

const env = process.env;
const envConfig = require(`./${env.NODE_ENV || 'development'}`);

const generalConfig = {
    isProduction: env.NODE_ENV === 'production'
};

module.exports = Object.assign({}, generalConfig, envConfig);