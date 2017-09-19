'use strict';

const User = require('../api/user/user.model');
const { checkUserOnFirebase } = require('../api/user/user.helpers');
const config = require('../env');
const logger = require('../libs/logger');
const passport = require('passport');
const { ExtractJwt, Strategy } = require("passport-jwt");

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
options.secretOrKey = config.secret;

passport.use(new Strategy(options, ({ _id, iat }, done) => {
    return checkUserOnFirebase(_id)
        .then(firebaseUser => User.findOne({ _id }))
        .then((user) => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch((err) => {
            return done(err);
        });
}));

module.exports = passport;