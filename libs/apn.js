'use strict';

const apn = require('apn');
const { nodeEnv, isProduction, bundleId } = require('../env');
const { join } = require('path');
const logger = require('../libs/logger');

const apnProvider = new apn.Provider({
    pfx: join(__dirname, `../env/${nodeEnv}/cert.p12`),
    production: isProduction,
});

apnProvider.on('connected', () => {
    logger.log('APNS SERVER Connected');
});

apnProvider.on('transmitted', (notification, device) => {
    logger.log(`APNS SERVER  Notification transmitted to: ${device.token.toString('hex')}`);
});

apnProvider.on('transmissionError', (errCode, notification, device) => {
    logger.error(`APNS SERVER  Notification caused error: ${errCode} for device `, device, notification);
    switch (errCode) {
        case 1: logger.log('Processing error'); break;
        case 2: logger.log('Missing device token'); break;
        case 3: logger.log('Missing topic'); break;
        case 4: logger.log('Missing payload'); break;
        case 5: logger.log('Invalid token size'); break;
        case 6: logger.log('Invalid topic size'); break;
        case 7: logger.log('Invalid payload size'); break;
        case 8: logger.log('APNS SERVER  A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox'); break;
        case 513: logger.log('Certificate has expired'); break;
    }
});

apnProvider.on('error', err => {
    logger.log('APNS SERVER - ', err);
});

apnProvider.on('timeout', () => {
    logger.log('APNS SERVER  Connection Timeout');
});

apnProvider.on('disconnected', () => {
    logger.log('APNS SERVER  Disconnected from APNS');
});


const sendPushiOS = (token, data) => {
    const note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "ping.aiff";
    note.alert = data.body;
    note.payload = { data };
    note.topic = bundleId;

    return apnProvider.send(note, token);
};

module.exports = sendPushiOS;