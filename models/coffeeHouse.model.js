'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    COFFEEHOUSESTATUSES
} = require('../constants/index');
const { values } = require('lodash');

const wifiSchema = new mongoose.Schema({
    bssid: String,
    ssid: String,
    wifiPassword: String,
    welcomeMessage: String,
});

const coffeeHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    bannerUrls: [String],
    description: String,
    coins: Number,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        select: false,
    },
    address: String,
    socials: {
        facebook: String,
        instagram: String,
        twitter: String,
        google: String,
        pinterest: String,
    },
    status: {
        type: String,
        enum: values(COFFEEHOUSESTATUSES),
        default: COFFEEHOUSESTATUSES.ONLINE,
        select: false,
    },
    wifi: {
        type: wifiSchema,
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
    }
}, modelOptions);

coffeeHouseSchema.statics.getHousesByLocation = function ({ lng, lat }) {
    return this.find({
        status: COFFEEHOUSESTATUSES.ONLINE,
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat],
                    5 / 6371    //radius 5 km / radius of The Earth
                ]
            }
        }
    })
        .select({
            name: 1,
            avatarUrl: 1,
            location: 1,
            address: 1
        })
        .lean()
};

const CoffeeHouse = mongoose.model(MODELS.COFFEEHOUSE, coffeeHouseSchema);

module.exports = CoffeeHouse;