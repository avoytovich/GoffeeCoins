'use strict';

const Constants = require('./index');
const ERRORS = require('./errors');

const GENERAL = {

    firebaseId: {
        notEmpty: true,
        matches: {
            options: Constants.REGEX.firebaseId
        }
    },
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: ERRORS.VALIDATION.EMAIL
    },
    name: {
        notEmpty: true,
        errorMessage: ERRORS.VALIDATION.NAME
    },
    url: {
        notEmpty: true,
        isURL: true,
        errorMessage: ERRORS.VALIDATION.URL
    },
    coord: {
        notEmpty: true,
        isFloat: true,
    },
    mongoId: {
        notEmpty: true,
        isMongoId: true,
    },
    arrayOfUrls: {
        optional: true,
        isArrayOfUrls: true,
    },
    coins: {
        optional: true,
        isInt: true,
    },
    location: {
        isLocation: true,
    },
    optionalLink: {
        optional: true,
        isURL: true,
    },
    NotEmpty: {
        notEmpty: true,
    },
    optionalUrl: {
        optional: true,
        notEmpty: false,
    }
};

module.exports = {
    USER: {
        _id: Object.assign({ errorMessage: ERRORS.VALIDATION.ID }, GENERAL.firebaseId),
        email: GENERAL.email,
        name: GENERAL.name,
        avatarUrl: GENERAL.url,
        referalId: Object.assign({ optional: true }, GENERAL.firebaseId)
    },
    MONGOID: GENERAL.mongoId,
    COORD: GENERAL.coord,
    USERID: Object.assign({ errorMessage: ERRORS.VALIDATION.ID }, GENERAL.firebaseId),
    COFFEEHOUSE: {
        name: GENERAL.name,
        description: GENERAL.NotEmpty,
        avatarUrl: GENERAL.url,
        bannerUrls: GENERAL.arrayOfUrls,
        coins: GENERAL.coins,
        location: GENERAL.location,
        address: GENERAL.NotEmpty,
        'socials.facebook': GENERAL.optionalUrl,
        'socials.instagram': GENERAL.optionalUrl,
        'socials.twitter': GENERAL.optionalUrl,
        'socials.google': GENERAL.optionalUrl,
        'socials.pinterest': GENERAL.optionalUrl,
        'wifi.bssid': GENERAL.NotEmpty,
        'wifi.ssid': GENERAL.NotEmpty,
        'wifi.wifiPassword': GENERAL.NotEmpty,
        'wifi.welcomeMessage': GENERAL.NotEmpty,
        owner: Object.assign({ optional: true }, GENERAL.firebaseId),
    }
};