'use strict';

module.exports = {
    REGEX: {
        firebaseId: ['^[a-zA-Z0-9]{28}$', 'g'],
        MATCH: /auth\/user-not-found/g
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
            bonusRequestFreeSent: 'bonusRequestFreeSent',
            bonusRequestFreeConfirmed: 'bonusRequestFreeConfirmed',
            bonusRequestFreeRejected: 'bonusRequestFreeRejected',
            bonusRequestCoin: 'bonusRequestCoin',
            bonusRequestCoinSent: 'bonusRequestCoinSent',
            bonusRequestCoinConfirmed: 'bonusRequestCoinConfirmed',
            bonusRequestCoinRejected: 'bonusRequestCoinRejected',
            adminRequest: 'adminRequest',
            adminRequestConfirmed: 'adminRequestConfirmed',
            fired: 'fired',
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
                bonusRequestFreeSent: 'Free coffee request  was sent.',
                bonusRequestFreeConfirmed: 'Free coffee request accepted!',
                bonusRequestFreeRejected: 'Free coffee request failed, unspent Coins have been replenished.',
                bonusRequestCoin: (n) => `Bonus request received from ${n}`,
                bonusRequestCoinSent: (c) => `Bonus request for ${c} Coins was sent.`,
                bonusRequestCoinConfirmed: (c) => `Request accepted, ${c} Coin(s) added.`,
                bonusRequestCoinRejected: 'Coin request has been declined by administrator.',
                adminRequest: (n) => `Administrator request received from ${n}`,
                adminRequestConfirmed: (n) => `You've become an admin at ${n}`,
                fired: (n) => `You've resigned from admin position at ${n}`,
                friendRegistered: 'Your referred friend has just registered. Bonus Coin added. Well done :)',
            },
            UA: {
                bonusRequestFree: (n) => `Запит на безкоштовну каву отримано від ${n}`,
                bonusRequestFreeSent: 'Запит на безкоштовну каву відправлено.',
                bonusRequestFreeConfirmed: 'Запит на безкоштовну каву прийнято!',
                bonusRequestFreeRejected: 'Запит на безкоштовну каву відхилено, не витрачені Coins відновлено.',
                bonusRequestCoin: (n) => `Отримано запит на Coins від ${n}`,
                bonusRequestCoinSent: (c) => `Відправлено запит на ${c} Coins.`,
                bonusRequestCoinConfirmed: (c) => `Запит прийнято, ${c} Coins нараховані.`,
                bonusRequestCoinRejected: 'Запит на Coins був відхилений адміністратором закладу.',
                adminRequest: (n) => `Заклад ${n} запрошує Вас стати адміністратором.`,
                adminRequestConfirmed: (n) => `Ти став адміністратором в ${n}`,
                fired: (n) => `Ти звільнився з посади адміністратора в ${n}`,
                friendRegistered: 'Твій запрошений друг щойно зареєструвався. Бонусний Coin нараховано. Вітаємо:)',
            },
            RU: {
                bonusRequestFree: (n) => `Запрос на бесплатный кофе получен от ${n}`,
                bonusRequestFreeSent: 'Запрос на бесплатный кофе отправлен.',
                bonusRequestFreeConfirmed: 'Запрос на бесплатный кофе принят!',
                bonusRequestFreeRejected: 'Запрос на бесплатный кофе отклонен, не использованные Coins восстановлены.',
                bonusRequestCoin: (n) => `Запрос на Coins получен от ${n}`,
                bonusRequestCoinSent: (c) => `Отправлен запрос на ${c} Coins.`,
                bonusRequestCoinConfirmed: (c) => `Запрос принят, ${c} Coins засчитано.`,
                bonusRequestCoinRejected: 'Запрос на Coins был отклонён администратором заведения.',
                adminRequest: (n) => `Заведение ${n} приглашает Вас стать администратором.`,
                adminRequestConfirmed: (n) => `Ты стал администратором в ${n}`,
                fired: (n) => `Ты уволился с поста администратора в ${n}`,
                friendRegistered: 'Твой приглашенный друг только что зарегистрировался. Бонусный Coin засчитан. Поздравляем :)',
            },
        },
    },
    ERROR: {
        firebase: {
            notFound: 'NOT_FOUND_IN_FIREBASE',
            another: 'ANOTHER_FIREBASE_ERROR'
        },
        db: {
            notFound: 'NOT_FOUND_IN_DB',
            forbidden: 'FORBIDDEN',
            serverError: 'SERVER_ERROR',
            unauthorized: 'UNAUTHORIZED',
            badRequest: 'BAD_REQUEST'
        }
    }
};