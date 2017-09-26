'use strict';

const mobileRouter = require('express').Router();
const passport = require('../middleware/passport-jwt');

const userRouter = require('../api/user/user.router');
const housesRouter = require('../api/coffeeHouse/coffeeHouse.router');
const bonusesRouter = require('../api/bonusRequest/bonusRequest.router');


mobileRouter.use('/user', userRouter);
mobileRouter.use(passport.authenticate('jwt', { session: false }));
mobileRouter.use('/coffeeHouse', housesRouter);
mobileRouter.use('/bonusRequest', bonusesRouter);

module.exports = mobileRouter;