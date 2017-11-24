'use strict';

const bonusRequestRouter = require('express').Router();
const Ctrl = require('./bonusRequest.ctrl');
const responseHandler = require('../../middleware/responseHandler');

const validationMiddleware = (req, res, next) => {
    req.checkParams('_id').optional().isMongoId();
    req.checkQuery('start').isNumeric();
    req.checkQuery('end').isNumeric();
    req.sanitizeQuery('start').toInt();
    req.sanitizeQuery('end').toInt();
    next();
};


bonusRequestRouter.get('/coffee/:_id?',
    validationMiddleware,
    responseHandler(Ctrl.coffeeAnalytics)
);


bonusRequestRouter.get('/paychart/:_id?',
    validationMiddleware,
    responseHandler(Ctrl.paychart)
);


bonusRequestRouter.get('/visits/:_id?',
    validationMiddleware,
    responseHandler(Ctrl.visitorChart)
);


bonusRequestRouter.get('/time/:_id?',
    validationMiddleware,
    responseHandler(Ctrl.timeOfStayChart)
);


module.exports = bonusRequestRouter;