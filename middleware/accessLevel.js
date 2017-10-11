'use strict';

const { FORBIDDEN } = require('http-statuses');
const { ADMIN_TYPES, MODELS } = require('../constants');

const accessLevelMiddleware = type => ({ user }, res, next) => {
    switch (type) {
        case ADMIN_TYPES.GLOBAL:
            if (user.type === ADMIN_TYPES.GLOBAL) return next();
            break;

        case ADMIN_TYPES.OWNER:
            if (user.type === ADMIN_TYPES.OWNER) return next();
            break;

        case MODELS.USER:
            if (user.type === undefined) return next();
            break;
    }
    return res.status(FORBIDDEN.code).json({
        success: false,
        message: FORBIDDEN.message,
    });
};

module.exports = accessLevelMiddleware;