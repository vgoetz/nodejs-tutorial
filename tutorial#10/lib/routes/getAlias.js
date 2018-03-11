'use strict';

const flaschenpost = require('flaschenpost');
const logger = flaschenpost.getLogger();

const getAlias = function (database) {
  if (!database) {
    throw new Error('Database is missing.');
  }

  return function (req, res) {
    const alias = req.params.alias;

    database.getMapping(alias, (err, mapping) => {
      if (err) {
        logger.error('Failed to get mapping from database.', { err });
        return res.status(404).end();
      }

      res.redirect(307, mapping.target);
    });
  };
};

module.exports = getAlias;