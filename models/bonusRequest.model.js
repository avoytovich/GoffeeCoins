'use strict';

const Coin = require('./coin.model');
const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    REQUEST_STATUSES,
    BONUS_TYPES
} = require('../constants/index');
const noteHelper = require('../helpers/notification/index.js');
const Promise = require('bluebird');

const bonusRequestSchema = new mongoose.Schema({
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
    count: Number,
    status: {
        type: String,
        enum: Object.values(REQUEST_STATUSES),
        default: REQUEST_STATUSES.CREATED,
    },
    type: {
        type: String,
        enum: Object.values(BONUS_TYPES),
        default: BONUS_TYPES.COIN,
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


bonusRequestSchema.statics.getRequests = function (coffeeHouseID) {
    const query = {
        coffeeHouseID,
        status: REQUEST_STATUSES.CREATED
    };
    return this.find(query)
        .select('userID count type createdAt')
        .populate('userID', 'name avatarUrl')
};


bonusRequestSchema.methods.confirm = function (coffeeHouseAdminID) {
    const { type, count, coffeeHouseID, userID } = this;
    const request = this;
    switch (type) {
        case BONUS_TYPES.COIN:
            let coinPromises = [];
            for (let i = 0; i < count; i++) {
                coinPromises.push({
                    coffeeHouseAdminID,
                    coffeeHouseID,
                    userID,
                });
            }
            return Promise.map(coinPromises, item => Coin.create(item))
                .then(() => request.update({$set: {
                    status: REQUEST_STATUSES.ACCEPTED
                }}))
                .then(() => {
                    return noteHelper.createCoinRequestConfirmedNote(request);
                })
                .then(() => {});

        case BONUS_TYPES.FREE:
            return request.update({status: REQUEST_STATUSES.ACCEPTED})
                .then(() => {
                    return noteHelper.createFreeRequestConfirmedNote(request);
                });
    }
};


bonusRequestSchema.methods.reject = function () {
    const { type, count, coffeeHouseID, userID } = this;
    const request = this;
    switch (type) {
        case BONUS_TYPES.COIN:
            return request.update({status: REQUEST_STATUSES.DECLINED})
                .then(() => noteHelper.createCoinRequestRejectedNote(request));

        case BONUS_TYPES.FREE:
            const query = {
                userID,
                coffeeHouseID,
                coffeeHouseAdminIDapproved: {
                    $exists: false
                }
            };
            return Coin.find(query)
                .sort({creationTimestamp: -1})
                .limit(count)
                .then(coins => Promise.map(coins, coin => coin.update({$unset: {
                    usedTimestamp: 1,
                    usedCoffeeHouseID: 1,
                    coffeeHouseAdminIDapproved: 1,
                }})))
                .then(results => {
                    return request.update({status: REQUEST_STATUSES.DECLINED});
                })
                .then(() => noteHelper.createFreeRequestRejectedNote(request));
    }
};


const BonusRequest = mongoose.model(MODELS.BONUS_REQUEST, bonusRequestSchema);

module.exports = BonusRequest;