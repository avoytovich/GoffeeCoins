const mobileRouter = require('express').Router();

mobileRouter.use('/user', require('../api/user/user.router'));

module.exports = mobileRouter;