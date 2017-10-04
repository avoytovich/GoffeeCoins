'use strict';

const env = process.env;
const nodeEnv = env.NODE_ENV = env.NODE_ENV || 'development';
const envConfig = require(`./${nodeEnv}`);

const generalConfig = {
    nodeEnv,
    isProduction: env.NODE_ENV === 'production',
};

module.exports = Object.assign({}, generalConfig, envConfig);