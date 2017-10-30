'use strict';

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');

function createServer(port, router) {
    const app = express();

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(require('../middleware/cors'));
    app.use(express.static('public'));
    app.use('/apidoc', express.static('apidoc'));
    app.use('/api/v1', router);
    app.use(require('../middleware/notFound'));
    app.use(require('../middleware/errorHandler'));

    return http.createServer(app).listen(port);
}

module.exports = createServer;
