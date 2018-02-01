'use strict';

const mongoose = require('../libs/mongoose');
const {
    modelOptions,
    MODELS,
    COFFEE_HOUSE_STATUSES,
    DEFAULT_COIN_COUNT,
} = require('../constants/index');


const createGeoQuery = ({ lng, lat }, radius) => ({
    status: COFFEE_HOUSE_STATUSES.ONLINE,
    location: {
        $geoWithin: {
            $centerSphere: [
                [lng, lat],
                radius / 6371    //radius in km / radius of The Earth
            ]
        }
    }
});


const coffeeHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    bannerUrls: [String],
    description: String,
    coins: {
        type: Number,
        default: DEFAULT_COIN_COUNT,
    },
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
        enum: Object.values(COFFEE_HOUSE_STATUSES),
        default: COFFEE_HOUSE_STATUSES.ONLINE,
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
    },
    admins: [{
        type: String,
        ref: MODELS.USER,
    }],
    owner: {
        type: String,
        ref: MODELS.ADMIN,
    },
    internal: {
        type: Boolean,
        default: false,
        select: false,
    },
}, modelOptions);


coffeeHouseSchema.statics.getHousesByLocation = function (coords) {
    /*{
            name: 1,
            avatarUrl: 1,
            location: 1,
            address: 1,
        }*/
    return this.find(createGeoQuery(coords, 5))
        .select('-admins -owner +location')
        .lean()
};


coffeeHouseSchema.statics.getWifiInfo = function (coords) {
    return this.find(createGeoQuery(coords, 100))
        .select({
            name: 1,
            address: 1,
            avatarUrl: 1,
            wifi: 1,
            location: 1,
        })
};

const CoffeeHouse = mongoose.model(MODELS.COFFEEHOUSE, coffeeHouseSchema);

module.exports = CoffeeHouse;