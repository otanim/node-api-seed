var Q = require('q');

var userService;
function userHandler(users) {
  userService = users;
}


/**
 * Creates a new user.
 *
 * @example
 * userHandler.prototype.register(req, res, next);
 *
 * @param {Object} req
 * @param {Object} res - important thing is req.params.userId
 * @param {Function} next
 * @returns {Object} Returns status of user registration.
 */
userHandler.prototype.register = function (req, res, next) {
  return userService.save(req.body)
    .then(function () {
      if (err) {
        debug('user NOT saved');
        res.sendStatus(201);
      } else {
        debug('user saved');
        res.sendStatus(404);
      }
    })
    .catch(next);
};

/**
 * Return list of users.
 *
 * @example
 * userHandler.prototype.list(req, res, next);
 *
 * @param {Object} req
 * @param {Object} res - important thing is req.params.userId
 * @param {Function} next
 * @returns {Object} Returns list of users.
 */
userHandler.prototype.list = function (req, res, next) {
  return userService.list(req.body)
    .then(function (users) {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports = userHandler;
