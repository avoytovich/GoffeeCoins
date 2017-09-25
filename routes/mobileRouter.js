'use strict';

const mobileRouter = require('express').Router();
const passport = require('../middleware/passport-jwt');

const userRouter = require('../api/user/user.router');
const housesRouter = require('../api/coffeeHouse/coffeeHouse.router');


mobileRouter.use('/user', userRouter);
mobileRouter.use(passport.authenticate('jwt', { session: false }));
mobileRouter.use('/coffeeHouse', housesRouter);

module.exports = mobileRouter;