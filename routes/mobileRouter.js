const express = require('express');
const mobileRouter = express.Router();

mobileRouter.use('/user', require('../api/user/user.router'));

module.exports = mobileRouter;