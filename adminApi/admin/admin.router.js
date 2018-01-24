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

adminRouter.put('/forgot-password', (req, res, next) => {
    req.sanitizeBody('email').escape().trim();
    next();
}, responseHandler(adminCtrl.forgotPassword));

adminRouter.put('/reset-password', responseHandler(adminCtrl.resetPassword));

adminRouter.put('/activate', responseHandler(adminCtrl.activateOwner));

adminRouter.use(passport.authenticate('jwt', { session: false }));


adminRouter.get('/', responseHandler(adminCtrl.me));

adminRouter.route('/owner')
    .all(accessLevel(ADMIN_TYPES.GLOBAL))
    .get(responseHandler(adminCtrl.owners))
    .put(responseHandler(adminCtrl.updateOwner))
    .post((req, res, next) => {
        req.sanitizeBody('name').trim();
        req.sanitizeBody('email').escape().trim();
        next();
    }, responseHandler(adminCtrl.createOwner, {
        status: CREATED.code
    }));


adminRouter.put('/block/:_id', (req, res, next) => {
    req.checkParams({ _id: VALIDATIONS.USER._id });
    next();
}, responseHandler(adminCtrl.setBlock));


adminRouter.delete('/:_id', (req, res, next) => {
    req.checkParams({ _id: VALIDATIONS.USER._id });
    next();
}, responseHandler(adminCtrl.remove));


/*adminRouter.post('/logout', (req, res, next) => {
    req.logout();
    next();
}, responseHandler(() => {}));*/


module.exports = adminRouter;