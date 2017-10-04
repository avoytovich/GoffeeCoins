'use strict';

const { CREATED } = require('http-statuses');
const { param } = require('express-validator/check');
const bonusesRouter = require('express').Router();
const bonusesCtrl = require('./bonusRequest.ctrl');
const { BONUS_TYPES } = require('../../constants');
const responseHandler = require('../../middleware/responseHandler');


bonusesRouter.post('/', (req, res, next) => {
    req.checkBody('coffeeHouseID').isMongoId();
    req.checkBody('type').isIn(Object.values(BONUS_TYPES));
    req.checkBody('count').optional().isInt();
    next();
}, responseHandler(bonusesCtrl.createRequest, { status: CREATED.code }));


bonusesRouter.get('/:coffeeHouseID',
    param('coffeeHouseID').isMongoId(),
    responseHandler(bonusesCtrl.getRequests)
);


bonusesRouter.post('/confirm/:requestID',
    param('requestID').isMongoId(),
    responseHandler(bonusesCtrl.confirmRequest)
);


bonusesRouter.post('/reject/:requestID',
    param('requestID').isMongoId(),
    responseHandler(bonusesCtrl.rejectRequest)
);


module.exports = bonusesRouter;