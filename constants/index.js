'use strict';

module.exports = {
    REGEX: {
        firebaseId: ['^[a-zA-Z0-9]{28}$', 'g'],
    },
    modelOptions: {
        timestamps: true,
        versionKey: false
    }
};