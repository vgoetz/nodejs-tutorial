'use strict';

const http = require('http');    

const express = require('express'),
      ws = require('ws');

const app = express();

const server = http.createServer(app);

const wsServer = new ws.Server({server});

wsServer.on('connection', socket => {
    socket.on('message', data => {
        const message = JSON.parse(data);

        switch(message.type) {
            case 'ping':
                socket.send(JSON.stringify({type: 'ping', reply: 'pong'}));
                break;
            case 'request':
                socket.send(JSON.stringify({type: 'request', reply: 'response'}));
                break;
            default:
                socket.send(JSON.stringify({type: 'error'}));

        }
    });
});

setInterval(() => {
    wsServer.clients.forEach(client => {
        if (client.readyState !== ws.OPEN) {
            return;
        }

        client.send(JSON.stringify({type: 'heartbeat' }));
    });
}, 10 * 1000);


app.get('/', (req, res) => {
    res.send('Hallo über HTTP');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000...');
});