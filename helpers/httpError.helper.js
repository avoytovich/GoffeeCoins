const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED,
    INTERNAL_SERVER_ERROR, FORBIDDEN } = require('http-statuses');
const { ERROR } = require('../constants');

class HttpError extends Error {
    constructor(status, message, key, ...params) {
        super(...params);
        this.status = status;
        this.message = message;
        this.key = key;
    }

    static badRequest(message, key) {
        return new HttpError(
            BAD_REQUEST.code,
            message || BAD_REQUEST.message,
            key || ERROR.db.badRequest
        )
    }

    static unauthorized(message, key) {
        return new HttpError(
            UNAUTHORIZED.code,
            message || UNAUTHORIZED.message,
            key || ERROR.db.unauthorized
        )
    }

    static forbidden(message, key) {
        return new HttpError(
            FORBIDDEN.code,
            message || FORBIDDEN.message,
            key || ERROR.db.forbidden
        )
    }

    static notFound(message, key) {
        return new HttpError(
            NOT_FOUND.code,
            message || NOT_FOUND.message,
            key || ERROR.db.notFound
        )
    }

    static serverError(message, key) {
        return new HttpError(
            INTERNAL_SERVER_ERROR.code,
            message || INTERNAL_SERVER_ERROR.message,
            key || ERROR.db.serverError
        )
    }
}

module.exports = HttpError;
