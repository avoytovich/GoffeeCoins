'use strict';

const DeviceToken = require('../../models/deviceToken.model');

module.exports = {

    updateToken({ body: { deviceUId, deviceToken, language }, user }) {
        return DeviceToken.findByIdAndUpdate(deviceUId, {
            token: deviceToken,
            userID: user._id,
            language: language || 'UA',
        }, {
            upsert: true,
            new: true,
        }).then(token => {});
    }

};