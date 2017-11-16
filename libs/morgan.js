'use strict';

const morgan = require('morgan');

const createLogger = mark => (tokens, req, res) => {
    // get the status code if response written
    const status = res._header
        ? res.statusCode
        : undefined;

    // get status color
    const color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0; // no color

    // compile
    const fn = morgan.compile('\x1b[0m'
        + mark
        + ' :method :url \x1b['
        + color
        + 'm:status\x1b[0m - :response-time ms\x1b[0m');

    return fn(tokens, req, res);
};

morgan.format('web', createLogger('web'));
morgan.format('mobile', createLogger('mobile'));

module.exports = morgan;