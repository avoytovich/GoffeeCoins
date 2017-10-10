'use strict';

const { FORBIDDEN } = require('http-statuses');

module.exports = admin => ({ user }, res, next) => {
    console.log(admin ^ user.type);
    console.log(admin , user.type);
    if (!(admin ^ !!user.type)) return next();
    return res.status(FORBIDDEN.code)
        .json({
            success: false,
            message: FORBIDDEN.message
        });
};