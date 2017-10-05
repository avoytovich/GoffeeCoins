'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    REQUEST_STATUSES
} = require('../constants/index');

const adminRequestSchema = new mongoose.Schema({
    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.ADMIN,
        required: true,
    },
    userID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(REQUEST_STATUSES),
        default: REQUEST_STATUSES.CREATED,
    },
    updatedAt: Number,
    createdAt: {
        type: Number,
        default: Date.now,
    },
}, modelOptions);

const AdminRequest = mongoose.model(MODELS.ADMIN_REQUEST, adminRequestSchema);

module.exports = AdminRequest;

AdminRequest.create({
    adminID: 'EoE8TKSNKcSbFJXagznOMfnAiZg1',
    userID: 'NYJVszMLdlUgq7j8IR4KRU4WRuJ3',
    coffeeHouseID: '59d501ef3063254f96dc5d5b',
});

AdminRequest.create({
    adminID: 'HNTZTCbcO2cJMfckaJmLjng1mc13',
    userID: 'NYJVszMLdlUgq7j8IR4KRU4WRuJ3',
    coffeeHouseID: '59c9d506ce0e011b6d53d0c9',
});