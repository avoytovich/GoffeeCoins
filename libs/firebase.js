'use strict';

const admin = require('firebase-admin');
const config = require('../env');
const serviceAccount = require(`../env/${config.nodeEnv}/firebase.json`);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseURL
});

module.exports = {
    FirebaseRef: admin.database().ref(),
    FirebaseAuth: admin.auth(),
    Messaging: admin.messaging(),
};