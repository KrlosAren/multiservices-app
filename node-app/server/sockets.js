class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('client', (data) => {
                console.log(data);
                this.io.emit('server', data);
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
    }
}

module.exports = Sockets;