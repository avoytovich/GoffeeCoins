'use strict';

const admin = require('firebase-admin');
const config = require('../env');
const serviceAccount = require(`../env/${config.nodeEnv}/firebase.json`);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseURL
});

module.exports = {
    FirebaseAuth: admin.auth(),
/*    FirebaseRef: admin.database().ref(),
    Messaging: admin.messaging(),*/
};