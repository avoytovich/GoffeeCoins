'use strict';

const logger = require('./libs/logger');
const config = require('./env');

require('./libs/mongoose');
require('./libs/firebase');
require('./helpers/cronjob.helper');
require('./helpers/defaultData.helper');

require('./api/server');
require('./adminApi/server');
/*const http = require('http');
const app = require('./app');
const httpServer = http.createServer(app);
require('./api/socket/io')(httpServer);*/


if (!config.isProduction) {
    const apiDoc = require('apidoc');
    apiDoc.createDoc({
        src: 'api',
        dest: 'apidoc/api'
    });
}

require('events').EventEmitter.prototype._maxListeners = 100;

// Memory usage
setInterval(() => {
    const memory = (process.memoryUsage().heapUsed/1024/1024).toFixed(2);
    logger.info(`Memory usage: ${memory} mb`);
}, 2000000);

// =================================================================
// start the server ================================================
// =================================================================
/*
httpServer.listen(config.port)
    .on('error', (err) => logger.error(err))
    .on('listening', () => {
      logger.info('Listening on port ' + config.port);
    });
*/