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
        BONUS_REQUEST: 'BonusRequest',
        ADMIN_REQUEST: 'AdminRequest',
        DEVICE_TOKEN: 'DeviceToken',
    },
    COFFEE_HOUSE_STATUSES: {
        ONLINE: 'ONLINE',
        OFFLINE: 'OFFLINE',
        DEBT: 'DEBTOR',
    },
    REQUEST_STATUSES: {
        CREATED: 'CREATED',
        ACCEPTED: 'ACCEPTED',
        DECLINED: 'DECLINED',
    },
    BONUS_TYPES: {
        COIN: 'COIN',
        FREE: 'FREE',
    },
    DEFAULT_COIN_COUNT: 10,
};