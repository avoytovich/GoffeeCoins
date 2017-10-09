'use strict';

const gcm = require('node-gcm');
const { GCM } = require('../env');
const Promise = require('bluebird');

const instance = new gcm.Sender(GCM);
const sender = Promise.promisifyAll(instance);


const sendPushAndroid = (token, data) => {
    const registrationTokens = [token];
    const message = new gcm.Message();
    message.addData(data);

    return sender.sendAsync(message, { registrationTokens });
};

module.exports = sendPushAndroid;