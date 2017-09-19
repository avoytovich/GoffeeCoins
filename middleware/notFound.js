const { NOT_FOUND: { code, message } } = require('http-statuses');

module.exports = (req, res) => {
    res.status(code);
    if (req.accepts('json')) {
        res.json({ message });
    }
};