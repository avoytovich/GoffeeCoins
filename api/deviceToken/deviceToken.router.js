'use strict';

const tokenRouter = require('express').Router();
const tokenCtrl = require('./deviceToken.ctrl');
const responseHandler = require('../../middleware/responseHandler');

tokenRouter.put('/', (req, res, next) => {
    req.sanitizeBody('deviceUId').trim();
    req.sanitizeBody('deviceToken').trim();
    req.checkBody('deviceUId').notEmpty();
    req.checkBody('deviceToken').notEmpty();
    next();
}, responseHandler(tokenCtrl.updateToken));

module.exports = tokenRouter;