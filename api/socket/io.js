'use strict';

const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const { secret } = require('../../env');
const logger = require('../../libs/logger');
const pick = require('lodash/pick');

const {
    getUser,
    createVisit,
    defaultFields,
    getVisitors,
    getRequests,
    getVisitorsWithAdmins,
    isAdmin,
} = require('./io.helpers.js');

module.exports = server => {

    const io = socketIO.listen(server);

    io.use(socketioJwt.authorize({
        secret,
        handshake: true
    }));

    io.on('connection', socket => {

        logger.log(socket.decoded_token);

        const sockets = Object.values(io.sockets.clients().sockets);

        Object.assign(socket, { userId: socket.decoded_token._id });

        const socketsWithThisId = sockets.filter(sock => {
            return sock.decoded_token._id === socket.userId
        });

        if (socketsWithThisId.length > 1) {
            socketsWithThisId.forEach(sock => {
                if (sock !== socket) sock.disconnect(true);
            });
        }

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
            // logger.log(houseId);
            Object.assign(socket, { houseId });
            const userId = socket.userId || socket.decoded_token._id;
            const isAdminOfHouse = isAdmin(socket.user, houseId);

            if (!socket.currentVisit && !isAdminOfHouse) {
                createVisit(userId, houseId, socket);
            }

            if (isAdminOfHouse) {
                socket.join(houseId);
                Object.assign(socket, { adminFor: houseId });
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
                const userToSend = pick(socket.user, defaultFields);
                io.to(houseId).emit('newUserInCoffeeHouse', userToSend);
            }
            io.emit('broadcast_newUserInCoffeeHouse', {houseId: houseId, userId: userId});
        });

        socket.on('leaveCoffeeHouse', houseId => {
            io.emit('broadcast_userLeaveCoffeeHouse', { userId: socket.userId, houseId: socket.houseId});
            if (socket.currentVisit) {
                socket.currentVisit.getOut();
                Object.assign(socket, { currentVisit: null });
            }
            if (!socket.adminFor) {
                io.to(socket.houseId).emit('userLeaveCoffeeHouse', socket.userId);
            } else {
                socket.leave(socket.houseId);
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
            logger.log('disconnect', socket.userId);
            io.emit('broadcast_userLeaveCoffeeHouse', { userId: socket.userId, houseId: socket.houseId});
            if (socket.currentVisit) {
                socket.currentVisit.getOut();
                Object.assign(socket, { currentVisit: null });
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