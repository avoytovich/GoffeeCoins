'use strict';

const adminRouter = require('express').Router();
const adminCtrl = require('./admin.ctrl');

const VALIDATIONS = require('../../constants/validations');
const passport = require('../../middleware/passport-jwt');
const responseHandler = require('../../middleware/responseHandler');


/*adminRouter.post('/', (req, res, next) => {
    req.sanitizeBody('name').trim();
    req.checkBody(
        pick(VALIDATIONS.USER, ['_id', 'name', 'avatarUrl', 'referalId'])
    );
    next();
}, responseHandler(userCtrl.signup, {
    status: CREATED.code,
}));*/


adminRouter.post('/login', (req, res, next) => {
    req.checkBody(pick(VALIDATIONS.USER, ['_id']));
    next();
}, responseHandler(adminCtrl.login));


userRouter.use(passport.authenticate('jwt', { session: false }));

module.exports = adminRouter;