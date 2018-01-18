const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED,
    INTERNAL_SERVER_ERROR, FORBIDDEN } = require('http-statuses');

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
            key
        )
    }

    static unauthorized(message, key) {
        return new HttpError(
            UNAUTHORIZED.code,
            message || UNAUTHORIZED.message,
            key
        )
    }

    static fobidden(message, key) {
        return new HttpError(
            FORBIDDEN.code,
            message || FORBIDDEN.message,
            key
        )
    }

    static notFound(message, key) {
        return new HttpError(
            NOT_FOUND.code,
            message || NOT_FOUND.message,
            key
        )
    }

    static serverError(message, key) {
        return new HttpError(
            INTERNAL_SERVER_ERROR.code,
            message || INTERNAL_SERVER_ERROR.message,
            key
        )
    }
}

/*try {
    throw HttpError.unauthorized();
} catch(e){
    console.log(e.status); //400
    console.log(e.message);
    console.log(e.key); //7
}*/

module.exports = HttpError;
