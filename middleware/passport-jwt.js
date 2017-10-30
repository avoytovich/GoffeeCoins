'use strict';

const User = require('../models/user.model');
const { checkUserOnFirebase } = require('../helpers/auth.helper');
const config = require('../env');
const { ExtractJwt, Strategy } = require("passport-jwt");
const { UNAUTHORIZED } = require('http-statuses');
const error = UNAUTHORIZED.createError();

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
options.secretOrKey = config.secret;

const strategy = new Strategy(options, ({ _id, iat }, done) => {
    return checkUserOnFirebase(_id)
        .then(firebaseUser => User.getUser(_id))
        .then(user => {
            if (user) return done(null, user);
            return done(error, false);
        })
        .catch(done);
});

module.exports = passport => {
    passport.use(strategy);
};