'use strict';

const { FirebaseAuth } = require('../libs/firebase');
const { UNAUTHORIZED, NOT_FOUND } = require('http-statuses');
const ERRORS = require('../constants/errors');
const logger = require('../libs/logger');
const HttpError = require('./httpError.helper');
const { ERROR, MATCH } = require('../constants');


module.exports = {

    checkUserOnFirebase(uid) {
        return FirebaseAuth.getUser(uid)
            .catch(error => {
                if (error.errorInfo.code.match(MATCH)) {
                    throw HttpError.unauthorized(error.message, ERROR.firebase.notFound);
                } else {
                    throw HttpError.unauthorized(error.message, ERROR.firebase.another);
                }
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

    createUser(data) {
        return FirebaseAuth.createUser(data);
    },

    updateUser(uid, data) {
        return FirebaseAuth.updateUser(uid, data);
    },

    getOrCreateAuthUser(data) {
        return FirebaseAuth.getUserByEmail(data.email)
            .then(userRecord =>  {
                return userRecord;
            })
            .catch(error => {
                return FirebaseAuth.createUser(data);
            });
    },

    setBlockForUser(uid, state) {
        return FirebaseAuth
            .updateUser(uid, {
                disabled: state
            })
            .catch(error => {
                throw NOT_FOUND.createError(error.message);
            });
    },

    removeUser(uid) {
        return FirebaseAuth.deleteUser(uid)
            .catch(error => {
                throw NOT_FOUND.createError(error.message);
            });
    },

};