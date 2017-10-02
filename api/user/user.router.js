'use strict';

const { CREATED } = require('http-statuses');
const pick = require('lodash/pick');
const userRouter = require('express').Router();
const userCtrl = require('./user.ctrl');
const passport = require('../../middleware/passport-jwt');
const VALIDATIONS = require('../../constants/validations');
const responseHandler = require('../../middleware/responseHandler');


userRouter.post('/', (req, res, next) => {
    // req.sanitizeBody('email').normalizeEmail();
    req.sanitizeBody('name').trim();
    req.checkBody(
        pick(VALIDATIONS.USER, ['_id', 'name', 'avatarUrl', 'referalId'])
    );
    next();
}, responseHandler(userCtrl.signup, {
    status: CREATED.code,
}));


userRouter.post('/login', (req, res, next) => {
    req.checkBody(pick(VALIDATIONS.USER, ['_id']));
    next();
}, responseHandler(userCtrl.login));


userRouter.use(passport.authenticate('jwt', { session: false }));


userRouter.route('/')
    .get(responseHandler(userCtrl.me))
    .put((req, res, next) => {
        req.sanitizeBody('name').trim();
        req.checkBody(
            pick(VALIDATIONS.USER, ['name', 'avatarUrl'])
        );
        next();
    }, responseHandler(userCtrl.update)
    );


userRouter.get('/invited', responseHandler(userCtrl.invited));


userRouter.post('/invited/:_id', (req, res, next) => {
    req.checkParam('_id').isMongoId();
    next();
},responseHandler(userCtrl.getBonusForInvited));

module.exports = userRouter;