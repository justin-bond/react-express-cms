'use strict';

const tasksRoutes = require('./tasksRoutes'),
  authRoutes      = require('./authRoutes');

module.exports = function(server) {
  tasksRoutes(server);
  authRoutes(server);

  server.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  });
};
