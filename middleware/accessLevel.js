'use strict';

const { FORBIDDEN } = require('http-statuses');

const accessLevelMiddleware = adminType => ({ user }, res, next) => {
    if (user && adminType === user.type) return next();
    res.status(FORBIDDEN.code).json({
        success: false,
        message: FORBIDDEN.message,
    });
};

module.exports = accessLevelMiddleware;