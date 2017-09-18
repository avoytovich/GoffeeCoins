const ERRORS = require('../constants/errors');

module.exports = (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ message:  ERRORS.NOT_FOUND });
    }
};