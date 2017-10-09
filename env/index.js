'use strict';

const env = process.env;
const nodeEnv = env.NODE_ENV = env.NODE_ENV || 'development';
const envConfig = require(`./${nodeEnv}`);

const generalConfig = {
    nodeEnv,
    isProduction: env.NODE_ENV === 'production',
    GCM: 'AAAAOqxfVd4:APA91bF4mVW1HuK2g5TtSvXvPoEavxokQO7kK_1uoCxgjMFkdfxF65EMAhPpbnShgr_Ju3C7pcwh3HMoOaA5JIqoIkSALwDGWOSAjoWO89kZNqevWRRBCpPEDKzAnJuOruCF4aPNiMSO',
    bundleId: 'com.boostmanagement.CofeeCoin',
};

module.exports = Object.assign({}, generalConfig, envConfig);