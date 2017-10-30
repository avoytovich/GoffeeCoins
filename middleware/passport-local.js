'use strict';

const User = require('../api/user/user.model');
const logger = require('../libs/logger');
const { USER } = require('../constants/errors');
const passport = require('passport');
const { Strategy } = require('passport-local');


const localStrategy = new Strategy({
    usernameField: 'e',
    passwordField: 'p'
}, (email, password, done) => {
    return User.findOne({ email }, '+hash')
        .then(user => {
            if (!user) return done(USER.NOT_FOUND);
            if (!user.validPassword(password)) return done(USER.WRONG_PASS);
            if (!user.confirmed.phone) return done(USER.NOT_VERIFIED_PHONE);
            if (!user.confirmed.email) return done(USER.NOT_CONFIRMED_EMAIL);
            user.hash = undefined;
            return done(null, user);
        })
        .catch(done);
});

passport.use(localStrategy);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
    return User.findById(id)
        .then(user => done(null, user))
        .catch(done);
});

module.exports = passport;