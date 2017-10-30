'use strict';

const { UNAUTHORIZED } = require('http-statuses');


function isAuthenticated(req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.status(UNAUTHORIZED.code)
            .json({
                success: false,
                message: UNAUTHORIZED.message,
            });
}

module.exports = isAuthenticated;