'use strict';

const { ADMIN_TYPES, COFFEE_HOUSE_STATUSES } = require('./');

module.exports = {
    GLOBAL_ADMIN: {
        id: null,
        fb: {           //firebase, not facebook :)
            email: 'coffeecoin@boost.solutions',
            emailVerified: true,
            password: 'coffee.solutions',
            displayName: 'Global Admin',
            disabled: false,
        },
        mongo: {
            email: 'coffeecoin@boost.solutions',
            name: 'Global Admin',
            type: ADMIN_TYPES.GLOBAL,
        },
    },
    COFFEEHOUSE: {
        _id: '585e5f70ec82991168ae7a03',
        name: 'CoffeeCoin',
        description: 'Internal Coffee shop',
        address: String,
        status: COFFEE_HOUSE_STATUSES.OFFLINE,
    },
    CHE: {
        "avatarUrl" : "http://www.mikocoffee.com/uk/wp-content/uploads/sites/5/2017/02/Mushroom-coffee.jpg",
        "bannerUrls" : [ "http://www.mikocoffee.com/uk/wp-content/uploads/sites/5/2017/02/Mushroom-coffee.jpg", "https://i.ytimg.com/vi/YVnd1DrHtI0/maxresdefault.jpg", "https://i.ytimg.com/vi/J6uWbiAd-6E/maxresdefault.jpg" ],
        "description" : "Boost Chernivci",
        "location" : [25.9595263, 48.2520092],
        "coins" : 10,
        "address" : "Головна вулиця, 246, Чернівці, Чернівецька, Украина, 58000",
        "name" : "Boost.Solutions",
        "wifi": {
            "bssid": "80:2a:a8:68:5c:4e",
            "wifiPassword": "boost***",
            "ssid": "Boost_Che",
            "welcomeMessage": "Вітаємо у Boost_Che"
        }
    },
    OWNER_ADMIN: {
        id: null,
        fb: {           //firebase, not facebook :)
            email: 'coffeeowner@boost.solutions',
            emailVerified: true,
            password: 'coffee.solutions',
            displayName: 'Global Admin',
            disabled: false,
        },
        mongo: {
            email: 'coffeeowner@boost.solutions',
            name: 'Global Admin',
            coffeeHouseID: '585e5f70ec82991168ae7a03',
        },
    },
};