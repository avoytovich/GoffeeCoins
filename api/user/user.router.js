'use strict';

const HTTP_STATUSES = require('http-statuses');
const _ = require('lodash');
const userRouter = require('express').Router();
const userCtrl = require('./user.ctrl');
const passport = require('../../middleware/passport-jwt');
const VALIDATIONS = require('../../constants/validations');
const generalHandler = require('../../middleware/generalHandler');


userRouter.post('/', (req, res, next) => {
    // req.sanitizeBody('email').normalizeEmail();
    req.sanitizeBody('name').trim();
    req.checkBody(
        _.pick(VALIDATIONS.USER, ['_id', 'name', 'avatarUrl', 'referalId'])
    );
    next();
}, generalHandler(userCtrl.signup, {
    status: HTTP_STATUSES.CREATED.code,
}));


userRouter.post('/login', (req, res, next) => {
    req.checkBody(_.pick(VALIDATIONS.USER, ['_id']));
    next();
}, generalHandler(userCtrl.login));


userRouter.use(passport.authenticate('jwt', { session: false }));


userRouter.route('/')
    .get((req, res) => res.json(req.user))
    .put((req, res, next) => {
        req.sanitizeBody('name').trim();
        req.checkBody(
            _.pick(VALIDATIONS.USER, ['name', 'avatarUrl'])
        );
        next();
    }, generalHandler(userCtrl.update)
    );

module.exports = userRouter;