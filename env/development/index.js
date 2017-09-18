"use strict";

const env = process.env;

module.exports = {
    port: env.PORT || 8030,
    secret: '9datuWxCQFWcqStAOuZC',
    mongoUrl: env.MONGO_URL || 'mongodb://localhost:27017/coffeeCoinsDev'
};