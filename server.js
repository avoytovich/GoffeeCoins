'use strict';

const http = require('http');
const config = require('./env');
const logger = require('./libs/logger');
const app = require('./app');
const httpServer = http.createServer(app);
const io = require('./socket/io')(httpServer);
require('./libs/mongoose');
require('./libs/firebase');
require('./helpers/cronjob.helper');
require('./helpers/defaultData.helper');

if (!config.isProduction) {
  const apiDoc = require('apidoc');
  apiDoc.createDoc({
    src: 'api',
    dest: 'apidoc/api'
  });
  apiDoc.createDoc({
    src: 'socket',
    dest: 'apidoc/socket'
  });
  /*apiDoc.createDoc({
    src: 'adminApi',
    dest: 'apidoc/adminApi'
  });*/
}

// Memory usage
setInterval(() => {
    const memory = (process.memoryUsage().heapUsed/1024/1024).toFixed(2);
    logger.info(`Memory usage: ${memory} mb`);
}, 2000000);

// =================================================================
// start the server ================================================
// =================================================================
httpServer.listen(config.port)
    .on('error', (err) => logger.error(err))
    .on('listening', () => {
      logger.info('Listening on port ' + config.port);
    });