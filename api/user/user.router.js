const express = require('express');
const userRouter = express.Router();
const userCtrl = require('./user.ctrl');
const Constants = require('../../constants');
const generalHandler = require('../../middleware/generalHandler');
const HTTP_STATUSES = require('http-statuses');
const logger = require('../../libs/logger');

userRouter.post('/', (req, res, next) => {
    req.checkBody({
        _id: {
            notEmpty: true,
            matches: {
                options: Constants.REQEX.firebaseId
            },
            errorMessage: 'Invalid uid'
        }
    });
    next();
}, generalHandler(userCtrl.create, {
    status: HTTP_STATUSES.CREATED.code,
    message: 'User successfully created!'
}));

module.exports = userRouter;