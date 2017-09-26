'use strict';

const CoffeeHouse = require('../../models/coffeeHouse.model');
const logger = require('../../libs/logger');
const Promise = require('bluebird');

const defaultData = [ {
    "avatarUrl" : "http://www.mikocoffee.com/uk/wp-content/uploads/sites/5/2017/02/Mushroom-coffee.jpg",
    "bannerUrls" : [ "http://www.mikocoffee.com/uk/wp-content/uploads/sites/5/2017/02/Mushroom-coffee.jpg", "https://i.ytimg.com/vi/YVnd1DrHtI0/maxresdefault.jpg", "https://i.ytimg.com/vi/J6uWbiAd-6E/maxresdefault.jpg" ],
    "description" : "This is a fake coffee shop with Boost2015 wifi This is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifiThis is a fake coffee shop with Boost2015 wifi",
    "location" : [22.293687, 48.614812],
    "coins" : 100,
    "address" : "Svabska 96",
    "name" : "Boost Solutions",
    "socials" : {
        "facebook" : "https://www.facebook.com/andris95",
        "instagram" : "https://www.instagram.com/szaniszlo.andras/",
        "orderedSocialLinks" : [ "https://www.facebook.com/andris95", "https://www.instagram.com/szaniszlo.andras/" ],
        "pinterest" : "sdfgdsfg"
    },
    wifi: {
        bssid: "8a:2a:a8:b1:f3:c0",
        wifiPassword: "boost2015",
        ssid: "Boost",
        welcomeMessage: "Welcome from Boost Wifi Network"
    }
}, {
    "avatarUrl" : "https://i.ytimg.com/vi/J6uWbiAd-6E/maxresdefault.jpg",
    "bannerUrls" : [ "https://i.ytimg.com/vi/J6uWbiAd-6E/maxresdefault.jpg", "https://wallpaperscraft.com/image/joy_jennifer_lawrence_2015_105464_1920x1080.jpg", "https://wallpaperscraft.com/image/joy_jennifer_lawrence_2015_105464_1920x1080.jpg" ],
    "description" : "This a fake coffee shop with Boost_guest wifi",
    "location" : [22.294066, 48.614806],
    "coins" : 77,
    "address" : "Svabska 63",
    "name" : "Boost Guest Shop",
    wifi: {
        bssid: "86:2a:a8:b1:f3:c0",
        wifiPassword: "key",
        ssid: "Boost_guest",
        welcomeMessage: "Welcome from Boost_guest Wifi Network"
    }
}, {
    "avatarUrl" : "https://i.ytimg.com/vi/LX1Nmnfigps/maxresdefault.jpg",
    "bannerUrls" : [ "https://i.ytimg.com/vi/LX1Nmnfigps/maxresdefault.jpg", "https://ohare.regency.hyatt.com/content/dam/PropertyWebsites/regency/chiro/Media/All/Hyatt-Regency-OHare-P223-Perks-Coffee-Shop-1280x720.jpg", "http://newcairoonline.com/property/0417/104/8122015065156_coffee-shop-for-rent-in_new-cairo-online.jpg" ],
    "description" : "This should be passizhy, but the wifi data is unknown yet...",
    "location" : [22.293451, 48.614368],
    "coins" : 15,
    "address" : "Svabska 70",
    "name" : "PAssizhy",
    wifi: {
        bssid: "60:e3:27:27:15:a0",
        wifiPassword: "key",
        ssid: "Passizhy",
        welcomeMessage: "Welcome from Passyzhy"
    }
}, {
    "avatarUrl" : "http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG",
    "bannerUrls" : [ "http://www.coffeeshopcompany.ru/upload/medialibrary/b79/IMG_3244.JPG", "https://ohare.regency.hyatt.com/content/dam/PropertyWebsites/regency/chiro/Media/All/Hyatt-Regency-OHare-P223-Perks-Coffee-Shop-1280x720.jpg", "http://newcairoonline.com/property/0417/104/8122015065156_coffee-shop-for-rent-in_new-cairo-online.jpg" ],
    "description" : "This should be Totem",
    "location" : [22.290801, 48.616542],
    "coins" : 700,
    "address" : "Prospekt",
    "name" : "Totem2",
    wifi: {
        bssid: "a0:f3:c1:fe:76:a2",
        wifiPassword: "key",
        ssid: "TOTEM",
        welcomeMessage: "Welcome from \"Totem\""
    }
} ];

/*
Promise.map(defaultData, item => CoffeeHouse.create(item))
    .then(result => logger.log(result))
    .catch(err => logger.error(err));*/
