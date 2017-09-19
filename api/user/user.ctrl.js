const User = require('./user.model.js');
const logger = require('../../libs/logger');

const userApiMethods = {

    create(ctx) {
        // logger.log(ctx);
        return ctx.body;
    }
};

module.exports = userApiMethods;