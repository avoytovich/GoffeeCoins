'use strict';

const adminRouter = require('express').Router();
const adminCtrl = require('./admin.ctrl');
const pick = require('lodash/pick');
const VALIDATIONS = require('../../constants/validations');
const passport = require('../../libs/passport');
const responseHandler = require('../../middleware/responseHandler');
const accessLevel = require('../../middleware/accessLevel');
const { CREATED } = require('http-statuses');
const { ADMIN_TYPES } = require('../../constants');


adminRouter.post('/login', (req, res, next) => {
    req.checkBody(pick(VALIDATIONS.USER, ['_id']));
    next();
}, responseHandler(adminCtrl.login));

adminRouter.put('/forgot-password', responseHandler(adminCtrl.forgotPassword));

adminRouter.put('/reset-password', responseHandler(adminCtrl.resetPassword));

adminRouter.use(passport.authenticate('jwt', { session: false }));


adminRouter.get('/', responseHandler(adminCtrl.me));


adminRouter.route('/owner')
    .all(accessLevel(ADMIN_TYPES.GLOBAL))
    .get(responseHandler(adminCtrl.owners))
    .post((req, res, next) => {
        req.sanitizeBody('name').trim();
        req.sanitizeBody('email').normalizeEmail();
        req.checkBody(
            pick(VALIDATIONS.USER, ['_id', 'email', 'name', 'avatarUrl'])
        );
        next();
    }, responseHandler(adminCtrl.createOwner, {
        status: CREATED.code
    }));


adminRouter.put('/block/:_id', (req, res, next) => {
    req.checkParams({ _id: VALIDATIONS.USER._id });
    next();
}, responseHandler(adminCtrl.block));


adminRouter.delete('/:_id', (req, res, next) => {
    req.checkParams({ _id: VALIDATIONS.USER._id });
    next();
}, responseHandler(adminCtrl.remove));


/*adminRouter.post('/logout', (req, res, next) => {
    req.logout();
    next();
}, responseHandler(() => {}));*/


module.exports = adminRouter;