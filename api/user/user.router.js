const express = require('express');
const _ = require('lodash');
const userRouter = express.Router();
const userCtrl = require('./user.ctrl');
const Constants = require('../../constants');
const ERRORS = require('../../constants/errors');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');
const HTTP_STATUSES = require('http-statuses');
const logger = require('../../libs/logger');

userRouter.post('/', (req, res, next) => {
    req.sanitizeBody('name').trim();
    req.sanitizeBody('email').normalizeEmail();

    req.checkBody(
        _.pick(VALIDATIONS.USER, ['_id', 'email', 'name', 'avatarUrl', 'referalId'])
    );

    next();
}, generalHandler(userCtrl.create, {
    status: HTTP_STATUSES.CREATED.code,
}));

module.exports = userRouter;