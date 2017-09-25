'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    COFFEEHOUSESTATUSES
} = require('../constants/index');
const { values } = require('lodash');


const coffeeHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    bannersUrls: [String],
    description: String,
    coins: Number,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
    },
    address: String,
    socials: {
        facebook: String,
        instagram: String,
        twitter: String,
        google: String
    },
    status: {
        type: String,
        enum: values(COFFEEHOUSESTATUSES),
        select: false,
    },
    wifi: {
        bssid: String,
        ssid: String,
        wifiPassword: String,
        welcomeMessage: String,
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
    }
}, modelOptions);

const CoffeeHouse = mongoose.model(MODELS.COFFEEHOUSE, coffeeHouseSchema);

module.exports = CoffeeHouse;