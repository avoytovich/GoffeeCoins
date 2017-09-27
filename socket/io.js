const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const { secret } = require('./../env/index');
const logger = require('./../libs/logger');
const pick = require('lodash/pick');

const { getUser, createVisit} = require('./io.helpers');

module.exports = server => {

    const io = socketIO.listen(server);

    io.use(socketioJwt.authorize({
        secret,
        handshake: true
    }));

    io.on('connection', socket => {
        logger.log(socket);
        socket.userId = socket.decoded_token._id;

        if (!socket.user) {
            socket.user = getUser(socket.decoded_token._id);
        }

        socket.on('error', error => {
            logger.err(error.type, error.code, error.message);
        });

        socket.on('hello', mes => socket.emit('world', `${mes} world`));

        socket.on('inCoffeeHouse', houseId => {
            const isAdmin = socket.user.isAdminInCoffeeHouse(houseId);
            if (isAdmin) {
                socket.join(houseId);
            } else {
                const userId = socket.userId || socket.decoded_token._id;
                socket.currentVisit = createVisit(userId, houseId);
                const userToSend = pick(socket.user, ['_id', 'name', 'coins', 'avatarUrl']);
                socket.to(houseId).broadcast.emit('newUserInCoffeeHouse', userToSend);
            }
        });

        socket.on('disconnect', () => {
            if (socket.currentVisit) {
                socket.currentVisit.getOut();
                socket.currentVisit = null;
            }
        });

    });
};