'use strict';

// =================================================================
// get the packages we need ========================================
// =================================================================
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const app = express();
const lessMiddleware = require('less-middleware');


app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');
app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(require('./middleware/cors'));
app.use(express.static('public'));
app.use('/apidoc', express.static('apidoc'));
app.use(require('./routes'));
app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));


module.exports = app;