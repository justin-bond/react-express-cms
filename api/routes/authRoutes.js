'use strict';

module.exports = function(server) {
  const userHandlers = require('../controllers/userController.js');

  server.route('/auth/register')
    .post(userHandlers.register);

  server.route('/auth/sign_in')
    .post(userHandlers.sign_in);
};
