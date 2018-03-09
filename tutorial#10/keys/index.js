'use strict';

const fs = require('fs'),
    path = require('path');

const getKeys = function () {
    const certificate = fs.readFileSync(path.join(__dirname, 'certificate.pem'), { encoding: 'utf8' }),
        privateKey = fs.readFileSync(path.join(__dirname, 'privateKey.pem'), { encoding: 'utf8' });

    return { certificate, privateKey };
};

module.exports = getKeys;