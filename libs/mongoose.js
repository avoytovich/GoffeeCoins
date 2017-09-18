"use strict";

const mongoose = require('mongoose');
const config = require('../env');

mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(config.mongoUrl, {
    useMongoClient: true,
});

if (!config.isProduction) {
    mongoose.set('debug', true);
}

module.exports = mongoose;