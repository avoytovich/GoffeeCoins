const Constants = require('./index');
const ERRORS = require('./errors');

const GENERAL = {
    firebaseId: {
        notEmpty: true,
        matches: {
            options: Constants.REGEX.firebaseId
        }
    },
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: ERRORS.VALIDATION.EMAIL
    },
    name: {
        notEmpty: true,
        errorMessage: ERRORS.VALIDATION.NAME
    },
    url: {
        notEmpty: true,
        isURL: true,
        errorMessage: ERRORS.VALIDATION.URL
    }
};

module.exports = {
    USER: {
        _id: Object.assign({ errorMessage: ERRORS.VALIDATION.ID }, GENERAL.firebaseId),
        email: GENERAL.email,
        name: GENERAL.name,
        avatarUrl: GENERAL.url,
        referalId: Object.assign({ optional: true }, GENERAL.firebaseId)
    }
};