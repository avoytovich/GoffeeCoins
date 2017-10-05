'use strict';

const mobileRouter = require('express').Router();
const passport = require('../middleware/passport-jwt');
const languageMiddleware = require('../middleware/language');

const userRouter = require('../api/user/user.router');
const housesRouter = require('../api/coffeeHouse/coffeeHouse.router');
const adminRequestRouter = require('../api/adminRequest/adminRequest.router');
const bonusesRouter = require('../api/bonusRequest/bonusRequest.router');
const tokenRouter = require('../api/deviceToken/deviceToken.router');


mobileRouter.use('/user', userRouter);
mobileRouter.use(passport.authenticate('jwt', { session: false }));
mobileRouter.use(languageMiddleware);
mobileRouter.use('/coffeeHouse', housesRouter);
mobileRouter.use('/adminRequest', adminRequestRouter);
mobileRouter.use('/bonusRequest', bonusesRouter);
mobileRouter.use('/deviceToken', tokenRouter);


module.exports = mobileRouter;