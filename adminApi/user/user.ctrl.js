'use strict';

const User = require('../../models/user.model');
const ERRORS = require('../../constants/errors');
const { DEFAULT_COIN_COUNT } = require('../../constants');
const { COFFEEHOUSE, OWNER_ADMIN } = require('../../constants/default');
const { checkUserOnFirebase } = require('../../helpers/auth.helper');
const { createFriendRegisteredNote } = require('../../helpers/notification');
const { NOT_FOUND, FORBIDDEN } = require('http-statuses');
const pick = require('lodash/pick');
const Promise = require('bluebird');


const userApiMethods = {

    getUsers({ query: { s } }) {
        const defaultQuery = {
            'disabled.removed': false,
        };
        if (s) defaultQuery.name = new RegExp(s, 'ig');
        return User.find(defaultQuery)
            .select('name avatarUrl disabled adminInCoffeeHouses')
    },

};

module.exports = userApiMethods;