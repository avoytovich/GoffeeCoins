'use strict';

const { FirebaseAuth } = require('../../libs/firebase');
const ERRORS = require('../../constants/errors');
const logger = require('../../libs/logger');

const { UNAUTHORIZED, FORBIDDEN } = require('http-statuses');

module.exports = {

    checkUserOnFirebase(uid) {
        return FirebaseAuth
            .getUser(uid)
            .catch(error => {
                throw UNAUTHORIZED.createError(error.message);
            })
            .then(userRecord => userRecord.toJSON())
            .then(firebaseUser => {
                if (firebaseUser.disabled) {
                    throw UNAUTHORIZED.createError(ERRORS.FORBIDDEN.DISABLED);
                }
                /*if (!firebaseUser.emailVerified) {
                    throw FORBIDDEN.createError(ERRORS.FORBIDDEN.EMAIL);
                }*/
                if (!firebaseUser.email) {
                    const { providerData: [ provider ] } = firebaseUser;
                    firebaseUser.email = provider && provider.email;
                }
                return firebaseUser;
            });
    },
};