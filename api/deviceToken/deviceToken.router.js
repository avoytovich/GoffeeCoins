'use strict';

const tokenRouter = require('express').Router();
const tokenCtrl = require('./deviceToken.ctrl');
const generalHandler = require('../../middleware/generalHandler');

tokenRouter.put('/', (req, res, next) => {
    req.sanitizeBody('deviceUId').trim();
    req.sanitizeBody('deviceToken').trim();
    req.checkBody('deviceUId').notEmpty();
    req.checkBody('deviceToken').notEmpty();
    next();
}, generalHandler(tokenCtrl.updateToken));

module.exports = tokenRouter;