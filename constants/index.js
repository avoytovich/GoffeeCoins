'use strict';

module.exports = {
    REGEX: {
        firebaseId: ['^[a-zA-Z0-9]{28}$', 'g'],
    },
    modelOptions: {
        timestamps: true,
        versionKey: false
    },
    UNIQUE_VL_OPTIONS: { message: 'User with {PATH} `{VALUE}` already registered.' },
    MODELS: {
        USER: 'User',
        COIN: 'Coin',
        COFFEEHOUSE: 'CoffeeHouse',
        ADMIN: 'Admin',
        VISITOR: 'Visitor',
    },
    COFFEEHOUSESTATUSES: {
        ONLINE: 'online',
        OFFLINE: 'offline',
        DEBT: 'debt'
    },
};