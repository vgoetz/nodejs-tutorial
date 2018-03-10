'use strict';

const bodyParser = require('body-parser'),
  express = require('express'),
  flaschenpost = require('flaschenpost');

const getApp = function (database) {
  if (!database) {
    throw new Error('Database is missing.');
  }

  const logger = flaschenpost.getLogger();

  const app = express();

  app.use(bodyParser.json());

  app.get('/:alias', (req, res) => {
    const alias = req.params.alias;

    database.getMapping(alias, (err, mapping) => {
      if (err) {
        logger.error('Failed to get mapping from database.', { err });
        return res.status(404).end();
      }

      res.redirect(mapping.target);
    });
  })

  app.post('/api/:alias', (req, res) => {
    const alias = req.params.alias,
      target = req.body.target;

    database.createMapping(alias, target, err => {
      if (err) {
        return res.status(500).end();
      }

      res.status(201).end();
    });
  });

  return app;
};

module.exports = getApp;