var Router = require('express').Router;
module.exports = function (app, users) {
  var usersRouter = new Router();

  usersRouter
    .get('/', users.list)
    .post('/', users.register);

  app.use('/users', usersRouter);
};

