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

    MongoClient.connect(connectionString, { autoReconnect: true }, (err, database) => {
      if (err) {
        return callback(err);
      }

      const myDatabase = database.db('db');
      const mappings = myDatabase.collection('mappings');

      this.mappings = mappings;
      callback(null);
    });
  },

  getMapping(alias, callback) {
    if (!alias) {
      throw new Error('Alias is missing.');
    }
    if (!callback) {
      throw new Error('Callback is missing');
    }

    this.mappings.findOne({ alias }, (err, mapping) => {
      if (err) {
        return callback(err);
      }
      if (!mapping) {
        return callback(new Error('Alias not found.'));
      }

      return callback(null, mapping);
    });
  },

  getMappings(callback) {
    if (!callback) {
      throw new Error('Callback is missing');
    }

    this.mappings.find({}, {_id: 0}).sort({alias: 1}).toArray((err, mappings) => {
      if (err) {
        return callback(err);
      }

      callback(null, mappings);
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
      target,
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
  },

  invokeMapping(id, callback) {
    if (!id) {
      throw new Error('Id is missing.');
    }
    if (!callback) {
      throw new Error('Callback is missing');
    }

    this.mappings.updateOne( {id}, {
      $inc: { 'statistics.invoked': 1 }
    }, err => {
      if (err) {
        return callback(err);
      }

      callback(null);
    });
  }
};

module.exports = database;