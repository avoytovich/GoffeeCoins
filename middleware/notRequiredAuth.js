'use strict';

const passport = require('../libs/passport');

module.exports = (req, res, next) => {
    if (req.header('Authorization')) {
        return passport.authenticate('jwt', {
            session: false
        })(req, res, next);
    }
    return next();
};
