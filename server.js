const http = require('http');

const app = require('./app');
const config = require('./env');
const logger = require('./libs/logger');

require('./libs/mongoose');

// Memory usage
setInterval(function(){
    logger.log("Memory usage: " + (process.memoryUsage().heapUsed/1024/1024).toFixed(2) + " mb");
}, 2000000);

// =================================================================
// start the server ================================================
// =================================================================
const httpServer = http.createServer(app);
httpServer.listen(config.port)
    .on('error', (err) => logger.error(err))
    .on('listening', () => logger.log('Listening on port ' + config.port));