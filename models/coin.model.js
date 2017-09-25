'use strict';

const mongoose = require('../libs/mongoose');
const { modelOptions, MODELS } = require('../constants/index');

const CoinSchema = new mongoose.Schema({
    coffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE,
        required: true,
    },
    coffeeHouseAdminID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    userID: {
        type: String,
        ref: MODELS.USER,
        required: true,
    },
    creationTimestamp: {
        type: Number,
        default: Date.now
    },
    usedTimestamp: Number,
    usedCoffeeHouseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE
    },
    coffeeHouseAdminIDapproved: {
        type: String,
        ref: MODELS.USER
    }
}, Object.assign({}, modelOptions, {timestamps: false} ));

const Coin = mongoose.model(MODELS.COIN, CoinSchema);

module.exports = Coin;