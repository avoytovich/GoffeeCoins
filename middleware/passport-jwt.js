'use strict';

const User = require('../models/user.model.js');
const { checkUserOnFirebase } = require('../helpers/auth.helper.js');
const config = require('../env');
const passport = require('passport');
const { ExtractJwt, Strategy } = require("passport-jwt");
const { UNAUTHORIZED } = require('http-statuses');
const error = UNAUTHORIZED.createError();

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
options.secretOrKey = config.secret;

passport.use(new Strategy(options, ({ _id, iat }, done) => {
    return checkUserOnFirebase(_id)
        .then(firebaseUser => User.getUser(_id))
        .then(user => {
            if (user) return done(null, user);
            return done(error, false);
        })
        .catch(done);
}));

module.exports = passport;