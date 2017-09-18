const express = require('express');
const morgan = require('morgan');
const mobileRouter = express.Router();

mobileRouter.use(morgan('dev'));

module.exports = mobileRouter;