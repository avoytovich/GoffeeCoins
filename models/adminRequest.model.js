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

adminRequestSchema.statics.getAdminData = function (userID) {
    return this.find({
        userID,
        status: {
            $in: [REQUEST_STATUSES.CREATED, REQUEST_STATUSES.ACCEPTED]
        }
    })
        .populate({
            path: 'coffeeHouseID',
            select: {
                name: 1,
                avatarUrl: 1,
                address: 1,
                status: 1,
            },
            model: MODELS.COFFEEHOUSE,
        })
        .select('-adminID')
};

const AdminRequest = mongoose.model(MODELS.ADMIN_REQUEST, adminRequestSchema);

module.exports = AdminRequest;