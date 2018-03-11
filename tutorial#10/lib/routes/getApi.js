'use strict';

const getApi = function (database) {
  if (!database) {
    throw new Error('Database is missing.');
  }

  return function (req, res) {
    database.getMappings((err, mappings) => {
      if (err) {
        return res.status(500).end();
      }
  
      res.send(mappings);
    })
  };
};

module.exports = getApi;


