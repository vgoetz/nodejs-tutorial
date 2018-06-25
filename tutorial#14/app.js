'use strict';

const http = require('http');    

const express = require('express'),
      ws = require('ws');

const app = express();

const server = http.createServer(app);

const wsServer = new ws.Server({server});

wsServer.on('connection', socket => {
    socket.on('message', message => {
        socket.send(message);
    });
});


app.get('/', (req, res) => {
    res.send('Hallo über HTTP');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
});