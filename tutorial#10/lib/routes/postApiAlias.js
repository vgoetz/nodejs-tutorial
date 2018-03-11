'use strict';

const postApiAlias = function (database) {
  if (!database) {
    throw new Error('Database is missing.');
  }

  return function (req, res) {
    const alias = req.params.alias,
      target = req.body.target;

    database.createMapping(alias, target, err => {
      if (err) {
        return res.status(500).end();
      }

      res.status(201).end();
    });
  };
};

module.exports = postApiAlias;


