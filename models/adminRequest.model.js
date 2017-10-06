'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    REQUEST_STATUSES
} = require('../constants/index');

const adminRequestSchema = new mongoose.Schema({
    adminID: {
        type: String,
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
    updatedAt: {
        type: Number,
        select: false,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
}, Object.assign({}, modelOptions, {timestamps: false}));

const AdminRequest = mongoose.model(MODELS.ADMIN_REQUEST, adminRequestSchema);

module.exports = AdminRequest;