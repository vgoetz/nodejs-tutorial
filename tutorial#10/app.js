'use strict';

const https = require('https');

const flaschenpost = require('flaschenpost'),
  processenv = require('processenv');

const database = require('./lib/database'),
  getApp = require('./lib/getApp'),
  getKeys = require('./keys');

const logger = flaschenpost.getLogger();

const connectionString = processenv('MONGO_URL') || 'mongodb://admin:secret@localhost:27017/admin',
  port = processenv('PORT') || 3000;

database.initialize(connectionString, err => {
  if (err) {
    logger.error('Failed to connect to database.', { err });
    process.exit(1);
  }

  const app = getApp(database),
    keys = getKeys();

  const server = https.createServer({
    cert: keys.certificate,
    key: keys.privateKey
  }, app);

  server.listen(3000, () => {
    console.log('Server started.', { port });
  });
});
