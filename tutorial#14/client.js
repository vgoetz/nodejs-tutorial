'use strict';

const ws = require('ws');

const wsClient = new ws('ws://localhost:3000');

wsClient.on('open', () => {
    wsClient.on('message', data => {
        const message = JSON.parse(data);

        console.log(message.reply);
    });

    wsClient.send(JSON.stringify({ type: 'ping'}));
});