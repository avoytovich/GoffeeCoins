'use strict';

const passport = require('passport');

require('../middleware/passport-local')(passport);
require('../middleware/passport-jwt')(passport);

module.exports = passport;