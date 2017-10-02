'use strict';

module.exports = {
    DEFAULT_ERROR: 'Invalid value',
    VALIDATION: {
        ID: 'Invalid UID!',
        EMAIL: 'Invalid email!',
        NAME: 'Name is required!',
        URL: 'Invalid URL!'
    },
    FORBIDDEN: {
        EMAIL: 'First, please confirm your email',
        DISABLED: 'Sorry, your account has been blocked or removed',
    },
    USER: {
        NOT_FOUND: 'No such account found',
        ALREADY_REGISTERED: 'User with {PATH} `{VALUE}` already registered.',
        NOT_INVITED: 'The user was not invited by you',
    },
    BONUS_REQUESTS: {
        NOT_ENOUGHT_BONUSES: 'Not enough CoffeeCoins!',
        NOT_IN: 'Sorry, but you can request only from coffee house.',
    },
    REQUESTS: {
        NOT_FOR_YOU: 'The request was not addressed to you!',
        HAS_BEEN_PROCESSED: s => `Request was already ${s.toLowerCase()}!`,
    },
    COFFEEHOUSE: {
        NOT_FOUND: 'Coffee house not found!',
        NOT_ADMIN: 'This action is only allowed to administrators!',
    },
};