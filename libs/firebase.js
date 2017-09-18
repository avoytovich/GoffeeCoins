"use strict";

const admin = require('firebase-admin');
const config = require('../env');

admin.initializeApp({
    credential: admin.credential.cert(require("../generalConfig/firebase-generalConfig.json")),
    databaseURL: config.get("firebaseURL")
});

module.exports = {
    db: admin.database().ref(),
    auth: admin.auth()
};