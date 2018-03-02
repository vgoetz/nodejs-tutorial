'use strict';

const https = require('https');

const flaschenpost = require('flaschenpost'),
    processenv = require('processenv');

const getApp = require('./lib/getApp'),
    getKeys = require('./keys');

const logger = flaschenpost.getLogger();

const port = processenv('PORT') || 3000;

const app = getApp(),
    keys = getKeys();

const server = https.createServer({
    cert: keys.certificate,
    key: keys.privateKey
}, app);

server.listen(3000, () => {
    console.log('Server started.', { port });
});