const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const { secret } = require('./env');
const logger = require('./libs/logger');

module.exports = server => {

    const io = socketIO.listen(server);

    io.use(socketioJwt.authorize({
        secret,
        handshake: true
    }));

    io.on('connection', socket => {
        console.log(socket);

        socket.on('error', error => {
            logger.err(error.type, error.code, error.message);
        });

        socket.on('hello', (mes) => socket.emit('world', `${mes} world`));

        socket.on('disconnect', () => {

        });

    });
};