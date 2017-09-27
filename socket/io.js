const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const { secret } = require('./../env/index');
const logger = require('./../libs/logger');
const pick = require('lodash/pick');

const {
    getUser,
    createVisit,
    defaultFields,
    getVisitors
} = require('./io.helpers');

module.exports = server => {

    const io = socketIO.listen(server);

    io.use(socketioJwt.authorize({
        secret,
        handshake: true
    }));

    io.on('connection', socket => {
        logger.log(socket.userId, socket.user, socket.houseId);

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

                const houseVisitors = io.sockets
                    .clients()
                    .filter(sock => {
                        return sock.houseId.toString() === houseId.toString();
                    })
                    .map(sock => sock.userId);

                const currentVisitors = getVisitors(houseId);
                socket.emit('listOfCurrentVisitors', currentVisitors);

            } else {

                const userId = socket.userId || socket.decoded_token._id;
                const userToSend = pick(socket.user, defaultFields);

                socket.houseId = houseId;
                socket.currentVisit = createVisit(userId, houseId);
                socket.to(houseId).broadcast.emit('newUserInCoffeeHouse', userToSend);
            }
        });

        /*socket.on('getListOfVisitors', houseId => {

            const isAdmin = socket.user.isAdminInCoffeeHouse(houseId);

            if (isAdmin) {

            }
        });*/

        socket.on('disconnect', () => {
            if (socket.currentVisit) {
                socket.currentVisit.getOut();
                socket.currentVisit = null;
            }
        });

    });
};