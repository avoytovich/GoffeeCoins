'use strict';

module.exports = {
    REGEX: {
        firebaseId: ['^[a-zA-Z0-9]{28}$', 'g'],
    },
    modelOptions: {
        timestamps: true,
        versionKey: false
    },
    MODELS: {
        USER: 'User',
        COIN: 'Coin',
        COFFEEHOUSE: 'CoffeeHouse',
    },
    COFFEEHOUSESTATUSES: {
        ONLINE: 'online',
        OFFLINE: 'offline',
        DEBT: 'debt'
    },
};