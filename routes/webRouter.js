'use strict';

const webRouter = require('express').Router();
const passport = require('../libs/passport');
// const sessionMiddleware = require('../middleware/session');
// const isAuthenticated = require('../middleware/isAuthenticated');
const morgan = require('../libs/morgan');

const housesRouter = require('../adminApi/coffeeHouse/coffeeHouse.router');
const adminRequestRouter = require('../adminApi/adminRequest/adminRequest.router');
const bonusRequestRouter = require('../adminApi/bonusRequest/bonusRequest.router');
const adminUserRouter = require('../adminApi/admin/admin.router');
const userRouter = require('../adminApi/user/user.router');


webRouter.use(morgan('web'));
// webRouter.use(sessionMiddleware);
// webRouter.use(passport.initialize());
// webRouter.use(passport.session());

webRouter.use('/admin', adminUserRouter);
// webRouter.use(isAuthenticated);
webRouter.use(passport.authenticate('jwt', { session: false }));
webRouter.use('/coffeeHouse', housesRouter);
webRouter.use('/adminRequest', adminRequestRouter);
webRouter.use('/bonusRequest', bonusRequestRouter);
webRouter.use('/user', userRouter);
/*webRouter.use('/files', ({ files: { file } }, res) => {
    console.log('here');
    readFileAndPutTos3(file)
        .then(url => res.json({ url }));
});*/

module.exports = webRouter;