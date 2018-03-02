'use strict';

const mongo = require('mongodb'),
    uuid = require('uuidv4');

const MongoClient = mongo.MongoClient;

const database = {
    initialize(connectionString, callback) {
        if (!connectionString) {
            throw new Error('Connection string is missing.');
        }
        if (!callback) {
            throw new Error('Callback is missing');
        }

        MongoClient.connect(connectionString, {autoReconnect: true}, (err, database) => {
            if(err) {
                return callback(err);
            }

            const mappings = database.collection('mappings');

            this.mappings = mappings;
            callback(null);
        });
    },     

    createMapping(alias, target, callback) {
        if (!alias) {
            throw new Error('Alias is missing.');
        }
        if (!target) {
            throw new Error('Target is missing.');
        }
        if (!callback) {
            throw new Error('Callback is missing');
        }

        const mapping = {
            id: uuid(),
            alias,
            target: body.target,
            statistics: {
                created: Date.now(),
                invoked: 0
            }
        };

        this.mappings.insertOne(mapping, err => {
            if (err) {
                return callback(err);
            }

            callback(null);
        });
    }
};