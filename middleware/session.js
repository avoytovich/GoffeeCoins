'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('./../libs/mongoose');
const { secret } = require('../env');
const mongooseConnection = mongoose.connection;

const store = new MongoStore({ mongooseConnection });
const sessionMiddleware = session({
    secret,
    store,
    resave: true,
    saveUninitialized: true,
});

module.exports = sessionMiddleware;