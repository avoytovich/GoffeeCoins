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
            referalId: 'referalId',
        },
        MESSAGES: {
            EN: {
                bonusRequestFree: 'Free coffee request received from %s',
                bonusRequestFreeConfirmed: 'Free coffee request accepted!',
                bonusRequestFreeRejected: 'Free coffee request failed, unspent CoffeeCoins have been replenished.',
                bonusRequestCoin: 'Bonus request received from %s',
                bonusRequestCoinConfirmed: 'CoffeeCoin request accepted, %d CoffeeCoin(s) added.',
                bonusRequestCoinRejected: 'CoffeeCoin request declined...',
                adminRequest: 'Administrator request received from %s',
            },
            UA: {
                bonusRequestFree: 'Запит на безкоштовну каву отримано від %s',
                bonusRequestFreeConfirmed: 'Запит на безкоштовну каву прийнято!',
                bonusRequestFreeRejected: 'Запит на безкоштовну каву відхилено, невитрачені CoffeeCoins відновлено.',
                bonusRequestCoin: 'Отримано запит на бонуси від %s',
                bonusRequestCoinConfirmed: 'CoffeeCoin запит прийнято, %d CoffeeCoin(-ів) додано.',
                bonusRequestCoinRejected: 'CoffeeCoin запит відхилено...',
                adminRequest: 'Заклад %s запрошує Вас стати адміністратором!',
            },
            RU: {
                bonusRequestFree: 'Запрос на бесплатное кофе получено от %s',
                bonusRequestFreeConfirmed: 'Запрос на бесплатный кофе принят!',
                bonusRequestFreeRejected: 'Запрос на бесплатный кофе отклонен, непотраченные CoffeeCoins восстановлено.',
                bonusRequestCoin: 'Запрос на бонус получено от %s',
                bonusRequestCoinConfirmed: 'CoffeeCoin запрос принят, %d CoffeeCoin(-ов) добавлено.',
                bonusRequestCoinRejected: 'CoffeeCoin запрос отклонен...',
                adminRequest: 'Заведение %s приглашает Вас стать администратором!',
            },
        }
    },
};