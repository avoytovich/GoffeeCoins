'use strict';

const sendPushiOS = require('../../libs/apn');
const sendPushAndroid = require('../../libs/node-gcm');
const { INVALID_TOKEN } = require('../../constants/errors');


module.exports = (token, data) => {
    switch (token.length) {
        case 64: return sendPushiOS(token, data);
        case 152: return sendPushAndroid(token, data);
        default: throw new Error(INVALID_TOKEN);
    }
};