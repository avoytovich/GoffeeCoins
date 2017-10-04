'use strict';

const { ADMIN_TYPES, COFFEE_HOUSE_STATUSES } = require('./');

module.exports = {
    GLOBAL_ADMIN: {
        id: null,
        fb: {           //firebase, not facebook :)
            email: 'coffeecoin@boost.solutions',
            emailVerified: true,
            password: 'coffee.solutions',
            displayName: 'Global Admin',
            disabled: false,
        },
        mongo: {
            email: 'coffeecoin@boost.solutions',
            name: 'Global Admin',
            type: ADMIN_TYPES.GLOBAL,
        },
    },
    COFFEEHOUSE: {
        _id: '585e5f70ec82991168ae7a03',
        name: 'CoffeeCoin',
        description: 'Internal Coffee shop',
        address: String,
        status: COFFEE_HOUSE_STATUSES.OFFLINE,
    },
    OWNER_ADMIN: {
        id: null,
        fb: {           //firebase, not facebook :)
            email: 'coffeeowner@boost.solutions',
            emailVerified: true,
            password: 'coffee.solutions',
            displayName: 'Global Admin',
            disabled: false,
        },
        mongo: {
            email: 'coffeeowner@boost.solutions',
            name: 'Global Admin',
            coffeeHouseID: '585e5f70ec82991168ae7a03',
        },
    },
};