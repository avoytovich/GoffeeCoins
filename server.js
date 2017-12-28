'use strict';

const logger = require('./libs/logger');
const config = require('./env');

require('./libs/mongoose');
require('./libs/firebase');
require('./helpers/cronjob.helper');
require('./helpers/defaultData.helper');

require('./api/server');
require('./adminApi/server');


if (!config.isProduction) {
    const apiDoc = require('apidoc');
    apiDoc.createDoc({
        src: 'api',
        dest: 'apidoc/api'
    });
}

require('events').EventEmitter.prototype._maxListeners = 1000;

// Memory usage
setInterval(() => {
    const memory = (process.memoryUsage().heapUsed/1024/1024).toFixed(2);
    logger.info(`Memory usage: ${memory} mb`);
}, 2000000);