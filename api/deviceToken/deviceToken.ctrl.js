'use strict';

const DeviceToken = require('../../models/deviceToken.model');
const logger = require('../../libs/logger');

module.exports = {

    updateToken({ body: { deviceUId, deviceToken }, user }) {
        logger.log(deviceUId, deviceToken);
        return DeviceToken.findByIdAndUpdate(
            deviceUId,
            {
                token: deviceToken,
                userID: user._id
            }, {
                upsert: true,
                new: true
            }
        ).then(token => {});
    }

};