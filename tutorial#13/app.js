'use strict';

const http2 = require('spdy'),
    fs = require('fs'),
    path = require('path');

const express = require('express');

const certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname, 'privateKey.pem'), 'utf8');

const app = express();

app.get('/', (req, res) => {
    res.send('Hallo aus Express über HTTPS');
});

const server = http2.createServer({
    cert: certificate,
    key: privateKey
}, app);

server.listen(3000);