const express = require('express');
const generalRouter = express.Router();

generalRouter.use('api/v1', require('./mobileRouter'));
generalRouter.use('adminApi/v1', require('./adminRouter'));

module.exports = generalRouter;