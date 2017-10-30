'use strict';

const config = require('../env');
const logger = require('../libs/logger');
const createServer = require('../helpers/createServer.helper');
const router = require('../routes/mobileRouter');

const server = createServer(config.port, router);
const io = require('./socket/io')(server);

server.on('error', (err) => logger.error(err))
    .on('listening', () => {
        logger.info('Mobile server listening on port ' + config.port);
    });

module.exports = server;