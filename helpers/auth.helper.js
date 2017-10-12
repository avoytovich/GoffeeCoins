'use strict';

const { FirebaseAuth } = require('../libs/firebase');
const { UNAUTHORIZED } = require('http-statuses');
const ERRORS = require('../constants/errors');
const logger = require('../libs/logger');


module.exports = {

    checkUserOnFirebase(uid) {
        return FirebaseAuth.getUser(uid)
            .catch(error => {
                throw UNAUTHORIZED.createError(error.message);
            })
            .then(userRecord => userRecord.toJSON())
            .then(firebaseUser => {
                if (firebaseUser.disabled) {
                    throw UNAUTHORIZED.createError(ERRORS.FORBIDDEN.DISABLED);
                }
                if (!firebaseUser.email) {
                    const { providerData: [ provider ] } = firebaseUser;
                    firebaseUser.email = provider && provider.email;
                }
                return firebaseUser;
            });
    },

    getOrCreateAuthUser(data) {
        return FirebaseAuth.getUserByEmail(data.email)
            .then(userRecord =>  {
                if (!userRecord) {
                    return FirebaseAuth.createUser(data);
                }
                return userRecord;
            })
            .catch(error => {
                logger.log(error);
            });
    },

    blockUser(uid) {
        return FirebaseAuth
            .updateUser(uid, {
                disabled: true
            })
            .catch(error => {
                throw error;
            });
    },

    removeUser(uid) {
        return FirebaseAuth.deleteUser(uid)
            .catch(error => {
                throw error;
            });
    },

};