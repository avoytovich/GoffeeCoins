'use strict';

const CoffeeHouse = require('../models/coffeeHouse.model');

const data = {
  "avatarUrl": "http://sbgboost.s3.amazonaws.com/title.jpg",
  "description": "Passizhy Coffee shop Кав'ярня-магазин",
  "location": [
    22.293451,
    48.614368
  ],
  "address": "вул. Швабська 70",
  "name": "Passizhy",
  "wifi": {
    "bssid": "60:e3:27:27:15:a0",
    "wifiPassword": "12345678",
    "ssid": "Passizhy",
    "welcomeMessage": "Welcome in Пасижу cafe :) Have a good time!"
  },
  "socials": {
    "facebook": "https://www.facebook.com/pages/Passi%D0%B6%D1%83/247896602066029",
    "instagram": "https://www.instagram.com/passizhy_coffee_shop"
  },
  "bannerUrls": [
    "http://sbgboost.s3.amazonaws.com/title.jpg"
  ]
};

// CoffeeHouse.create(data).then(() => {});