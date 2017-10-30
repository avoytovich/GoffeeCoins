'use strict';

const Admin = require('../models/admin.model');
const { checkUserOnFirebase } = require('../helpers/auth.helper');
const logger = require('../libs/logger');
const { USER } = require('../constants/errors');
const { NOT_FOUND } = require('http-statuses');
const { Strategy } = require('passport-local');


const localStrategy = new Strategy({
    usernameField: '_id',
    passwordField: '_id'
}, (id, pass, done) => {
    return checkUserOnFirebase(id)
        .then(firebaseUser => Admin.findById(id))
        .then(user => {
            if (!user) return done(NOT_FOUND.createError(USER.NOT_FOUND));
            return done(null, user);
        })
        .catch(done);
});

module.exports = passport => {

    passport.use(localStrategy);

    passport.serializeUser((admin, done) => done(null, admin._id));

    passport.deserializeUser((id, done) => {
        return Admin.findById(id)
            .then(admin => done(null, admin))
            .catch(done);
    });
};