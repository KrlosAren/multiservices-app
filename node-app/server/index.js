const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Database } = require('../database');
const { messagesApi } = require('../routes/messages');

const http = require('http');
const socketIO = require('socket.io');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.db = new Database();
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
    }

    config() {
        this.app.set('port', process.env.PORT || 3000);
    }

    debbugerConfig() {
        this.app.use(morgan('dev'));
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cors());
        this.app.use(express.json());
    }

    configureSockets() {
        new Sockets(this.io);
    }

    routes() {
        messagesApi(this.app);
    }

    start() {
        this.middlewares();
        this.configureSockets();
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}

module.exports = {
    Server,
};