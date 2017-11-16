'use strict';

const config = require('../env');
const logger = require('../libs/logger');
const createServer = require('../helpers/createServer.helper');
const router = require('../routes/webRouter');

const server = createServer(config.adminPort, router);
// const io = require('./socket/io')(server);

server.on('error', (err) => logger.error(err))
    .on('listening', () => {
        logger.info(`Admin server listening on port ${config.adminPort}`);
    });

module.exports = { server, };