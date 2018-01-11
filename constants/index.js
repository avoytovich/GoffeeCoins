'use strict';

module.exports = {
    REGEX: {
        firebaseId: ['^[a-zA-Z0-9]{28}$', 'g'],
    },
    modelOptions: {
        timestamps: true,
        versionKey: false,
    },
    UNIQUE_VL_OPTIONS: {
        message: 'User with {PATH} `{VALUE}` already registered.',
    },
    MODELS: {
        USER: 'User',
        COIN: 'Coin',
        COFFEEHOUSE: 'CoffeeHouse',
        ADMIN: 'Admin',
        VISITOR: 'Visitor',
        BONUS_REQUEST: 'BonusRequest',
        ADMIN_REQUEST: 'AdminRequest',
        DEVICE_TOKEN: 'DeviceToken',
        NOTIFICATION: 'Notification',
    },
    ADMIN_TYPES: {
        GLOBAL: 'GLOBAL',
        OWNER: 'OWNER',
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
    LANGUAGES: ['UA', 'RU', 'EN'],
    NOTIFICATIONS: {
        TITLE: 'CoffeeCoin',
        KEYS: {
            bonusRequestFree: 'bonusRequestFree',
            bonusRequestFreeConfirmed: 'bonusRequestFreeConfirmed',
            bonusRequestFreeRejected: 'bonusRequestFreeRejected',
            bonusRequestCoin: 'bonusRequestCoin',
            bonusRequestCoinConfirmed: 'bonusRequestCoinConfirmed',
            bonusRequestCoinRejected: 'bonusRequestCoinRejected',
            adminRequest: 'adminRequest',
            friendRegistered: 'friendRegistered',
        },
        LANGUAGES: {
            UA: 'UA',
            RU: 'RU',
            EN: 'EN',
        },
        MESSAGES: {
            EN: {
                bonusRequestFree: (n) => `Free coffee request received from ${n}`,
                bonusRequestFreeConfirmed: 'Free coffee request accepted!',
                bonusRequestFreeRejected: 'Free coffee request failed, unspent Coins have been replenished.',
                bonusRequestCoin: (n) => `Bonus request received from ${n}`,
                bonusRequestCoinConfirmed: (c) => `Request accepted, ${c} Coin(s) added.`,
                bonusRequestCoinRejected: 'Coin request has been declined by administrator.',
                adminRequest: (n) => `Administrator request received from ${n}`,
                friendRegistered: 'Your referred friend has just registered. Bonus Coin added. Well done :)',
            },
            UA: {
                bonusRequestFree: (n) => `Запит на безкоштовну каву отримано від ${n}`,
                bonusRequestFreeConfirmed: 'Запит на безкоштовну каву прийнято!',
                bonusRequestFreeRejected: 'Запит на безкоштовну каву відхилено, не витрачені Coins відновлено.',
                bonusRequestCoin: (n) => `Отримано запит на Coins від ${n}`,
                bonusRequestCoinConfirmed: (c) => `Запит прийнято, ${c} Coins нараховані.`,
                bonusRequestCoinRejected: 'Запит на Coins був відхилений адміністратором закладу.',
                adminRequest: (n) => `Заклад ${n} запрошує Вас стати адміністратором.`,
                friendRegistered: 'Твій запрошений друг щойно зареєструвався. Бонусний Coin нараховано. Вітаємо:)',
            },
            RU: {
                bonusRequestFree: (n) => `Запрос на бесплатный кофе получен от ${n}`,
                bonusRequestFreeConfirmed: 'Запрос на бесплатный кофе принят!',
                bonusRequestFreeRejected: 'Запрос на бесплатный кофе отклонен, не использованные Coins восстановлены.',
                bonusRequestCoin: (n) => `Запрос на Coins получен от ${n}`,
                bonusRequestCoinConfirmed: (c) => `Запрос принят, ${c} Coins засчитано.`,
                bonusRequestCoinRejected: 'Запрос на Coins был отклонён администратором заведения.',
                adminRequest: (n) => `Заведение ${n} приглашает Вас стать администратором.`,
                friendRegistered: 'Твой приглашенный друг только что зарегистрировался. Бонусный Coin засчитан. Поздравляем :)',
            },
        },
    },
};