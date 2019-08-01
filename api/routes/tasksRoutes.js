'use strict';

module.exports = function(server) {
  const todoList = require('../controllers/tasksController'),
  userHandlers    = require('../controllers/userController.js');

  // todoList Routes
  server.route('/api/tasks')
    .get(todoList.list_all_tasks)
    .post(userHandlers.loginRequired, todoList.create_a_task);

  // server.route('/tasks/:taskId')
  //   .get(todoList.read_a_task);
};