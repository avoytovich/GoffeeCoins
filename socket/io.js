'use strict';

const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const { secret } = require('./../env/index');
const logger = require('./../libs/logger');
const pick = require('lodash/pick');

const {
    getUser,
    createVisit,
    defaultFields,
    getVisitors,
    getRequests,
} = require('./io.helpers');

module.exports = server => {

    const io = socketIO.listen(server);

    io.use(socketioJwt.authorize({
        secret,
        handshake: true
    }));

    io.on('connection', socket => {

        logger.log(socket.decoded_token);

        socket.userId = socket.decoded_token._id;

        if (!socket.user) {
            getUser(socket.decoded_token._id, socket);
        }

        socket.on('error', error => {
            logger.err(error.type, error.code, error.message);
        });

        socket.on('hello', mes => {
            logger.log(mes);
            socket.emit('world', `${mes} world`)
        });

        socket.on('inCoffeeHouse', houseId => {
            socket.houseId = houseId;
            const isAdmin = socket.user && socket.user.isAdminInCoffeeHouse(houseId);

            if (isAdmin) {
                socket.join(houseId);
                socket.adminFor = houseId;
                const sockets = Object.values(io.sockets.clients().sockets);
                const visitorsSockets = sockets.filter(sock => {
                    return (sock.adminFor === undefined) &&
                        (String(sock.houseId) === String(houseId));
                }).map(sock => sock.userId);

                getVisitors(visitorsSockets)
                    .then(currentVisitors => {
                        logger.log(currentVisitors);
                        socket.emit('listOfCurrentVisitors', currentVisitors);
                    });
            } else {

                const userId = socket.userId || socket.decoded_token._id;
                const userToSend = pick(socket.user, defaultFields);

                if (!socket.currentVisit) {
                    createVisit(userId, houseId, socket);
                }
                io.to(houseId).emit('newUserInCoffeeHouse', userToSend);
            }
        });

        socket.on('getRequests', () => {
            if (socket.adminFor) {
                getRequests(socket.adminFor)
                    .then(requests => {
                        logger.log(requests);
                        socket.emit('requests', requests)
                    });
            } else {
                socket.emit('requests', []);
            }
        });

        socket.on('disconnect', () => {
            logger.log('disconnect');
            if (socket.currentVisit) {
                socket.currentVisit.getOut();
                socket.currentVisit = null;
            }
            if (!socket.adminFor) {
                io.to(socket.houseId).emit('userLeaveCoffeeHouse', socket.userId);
            } else {
                socket.leave(socket.houseId);
            }
        });

    });

    return io;
};