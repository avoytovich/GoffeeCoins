'use strict';

const mongoose = require('../libs/mongoose');
const Coin = require('./coin.model');
const Promise = require('bluebird');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const {
    modelOptions,
    MODELS,
    UNIQUE_VL_OPTIONS,
    DEFAULT_COIN_COUNT,
} = require('../constants/index');
const config = require('../env/index');


const UserSchema = new mongoose.Schema({
    _id: String,
    email: {
        type: String,
        lowercase: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    referalId: {
        type: String,
        ref: MODELS.USER,
        select: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    adminInCoffeeHouses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: MODELS.COFFEEHOUSE
    }],
}, modelOptions);


UserSchema.statics.getUser = function (id, selection) {
    return Promise.join(
        this.findById(id).select(selection),
        Coin.getUnusedCoinCount(id)
    ).then(([user, coins]) => {
        if (user) {
            const additionalData = {
                coins,
                coffeeHouseCoins: DEFAULT_COIN_COUNT
            };
            Object.assign(user._doc, additionalData);
            Object.assign(user, additionalData);
            return user;
        }
    });
};


UserSchema.methods.generateJWT = function () {
    return jwt.sign(
        { _id: this._id },
        config.secret
    );
};


UserSchema.methods.isAdminInCoffeeHouse = function (houseId) {
    return this.adminInCoffeeHouses.some(item => {
        return item.toString() === houseId.toString();
    });
};


UserSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const User = mongoose.model(MODELS.USER, UserSchema);

module.exports = User;