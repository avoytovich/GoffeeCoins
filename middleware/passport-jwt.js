'use strict';

const User = require('../models/user.model');
const Admin  = require('../models/admin.model');
const { checkUserOnFirebase } = require('../helpers/auth.helper');
const config = require('../env');
const { MODELS } = require('../constants');
const { ExtractJwt, Strategy } = require("passport-jwt");
const { UNAUTHORIZED } = require('http-statuses');
const error = UNAUTHORIZED.createError();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.secret,
};

const strategy = new Strategy(options, ({ _id, iat, type }, done) => {
    return checkUserOnFirebase(_id)
        .then(firebaseUser => {
            if (type === MODELS.ADMIN) {
                return Admin.findById(_id);
            }
            return User.getUser(_id);
        })
        .then(user => {
            if (user) return done(null, user);
            return done(error, false);
        })
        .catch(done);
});

module.exports = passport => {
    passport.use(strategy);
};