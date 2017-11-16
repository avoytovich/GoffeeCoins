'use strict';

const { CREATED } = require('http-statuses');
const pick = require('lodash/pick');
const userRouter = require('express').Router();
const userCtrl = require('./user.ctrl');
const VALIDATIONS = require('../../constants/validations');
const passport = require('../../libs/passport');
const responseHandler = require('../../middleware/responseHandler');


userRouter.post('/', (req, res, next) => {
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


//Temp routes for log iOS activity in production
userRouter.route('/logger')
    .post(responseHandler(userCtrl.logger))
    .get((req, res, next) => {
        const defaultData = [{createdAt: new Date(), type: 'N/A', description: 'N/A'}];
        userCtrl.getlogs(req.query).then(result => {
            let appLogs = result.length !== 0 ? result : defaultData;
            res.render('index', { appLogs });
        });
    });

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
    req.checkParams({ _id: VALIDATIONS.USER._id });
    next();
}, responseHandler(userCtrl.getBonusForInvited));

module.exports = userRouter;