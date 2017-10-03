'use strict';

const adminRequestRouter = require('express').Router();
const { param } = require('express-validator/check');
const Ctrl = require('./adminRequest.ctrl');
const responseHandler = require('../../middleware/responseHandler');


adminRequestRouter.post('/accept/:requestID',
    param('requestID').isMongoId(),
    responseHandler(Ctrl.accept)
);


adminRequestRouter.post('/decline/:requestID',
    param('requestID').isMongoId(),
    responseHandler(Ctrl.decline)
);


adminRequestRouter.get('/', responseHandler(Ctrl.adminPanel));


module.exports = adminRequestRouter;