'use strict';

const DeviceToken = require('../models/deviceToken.model');
const { LANGUAGES } = require('../constants');


module.exports = ({ headers: { language }, user }, res, next) => {
    if (user && language && LANGUAGES.includes(language)) {
        DeviceToken.update({
            userID: user._id
        }, {
            $set: { language }
        }, {
            multi: true
        })
    }
    next();
};