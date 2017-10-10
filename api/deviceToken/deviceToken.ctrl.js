'use strict';

const DeviceToken = require('../../models/deviceToken.model');

module.exports = {

    updateToken({ body: { deviceUId, deviceToken }, user }) {
        return DeviceToken.findByIdAndUpdate(deviceUId, {
            token: deviceToken,
            userID: user._id
        }, {
            upsert: true,
            new: true
        }).then(token => {});
    }

};