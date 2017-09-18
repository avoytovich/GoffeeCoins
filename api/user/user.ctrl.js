const User = require('./user.model.js');

const userApiMethods = {
    async create({ body }) {
        return body;
    }
};

module.exports = userApiMethods;