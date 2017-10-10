'use strict';

const mongoose = require('mongoose');
const config = require('../env');
const logger = require('../libs/logger');

mongoose.Promise = require('bluebird');

// connect to database
mongoose.connect(config.mongoUrl, {
    useMongoClient: true,
}, () => logger.info('Connect to db success'));

if (!config.isProduction) {
    // mongoose.set('debug', true);
}

module.exports = mongoose;