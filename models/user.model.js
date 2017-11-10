'use strict';

const mongoose = require('../libs/mongoose');
const Coin = require('./coin.model');
const AdminRequest = require('./adminRequest.model');
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
    disabled: {
        blocked: {
            type: Boolean,
            default: false,
            select: false,
        },
        removed: {
            type: Boolean,
            default: false,
            select: false,
        },
    },
}, modelOptions);


UserSchema.statics.getUser = function (id, selection) {
    return Promise.join(
        this.findById(id).select(selection),
        Coin.getUnusedCoinCount(id),
        AdminRequest.adminRequestsCount(id)
    ).then(([user, coins, adminRequestsCount]) => {
        if (user) {
            const additionalData = {
                coins,
                adminRequestsCount,
                coffeeHouseCoins: DEFAULT_COIN_COUNT
            };
            Object.assign(user._doc, additionalData);
            Object.assign(user, additionalData);
            return user;
        }
    });
};


UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        type: MODELS.USER,
    }, config.secret);
};


UserSchema.methods.isAdminInCoffeeHouse = function (houseId) {
    return this.adminInCoffeeHouses.some(item => {
        return String(item) === String(houseId);
    });
};


UserSchema.plugin(uniqueValidator, UNIQUE_VL_OPTIONS);

const User = mongoose.model(MODELS.USER, UserSchema);

module.exports = User;