var mongoose = require('mongoose-q')(require('mongoose'));
var debug = require('debug')('api:services:users');
var Q = require('q');

var User = mongoose.model('User');

exports.register = function (receivedData) {
  var login = receivedData.login;
  var fullName = receivedData.fullName;
  var password = receivedData.password;

  var user = new User({
    login: login,
    password: password,
    fullName: fullName
  });

  user.saveQ();
};

exports.list = function (receivedData) {
  var skip = receivedData && receivedData.skip || 0;
  var limit = receivedData && receivedData.limit || 50;

  var findQuery = {
    deleted: {$ne: true}
  };

  return User
    .find(findQuery)
    .skip(skip)
    .limit(limit)
    .execQ();
};