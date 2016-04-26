var fs = require('fs');
var mongoose = require('mongoose');
var _ = require('lodash');
var debug = require('debug')('init:db');

var connection = mongoose.connection;
var modelsPath = process.cwd() + '/src/models';
var schemaFiles = fs.readdirSync(modelsPath);

var dbInitialized = false;

module.exports = function (config) {
  var dbURL = config.DB;
  //Preventing the module to be initialize more than one time
  if (dbInitialized) {
    return;
  }
  dbInitialized = true;

  //Connecting to the database
  debug('initializing database connection');
  mongoose.connect(dbURL);

  connection.on('connected', function () {
    debug('Mongo::connected ');
  });
  connection.on('disconnected', function () {
    debug('Mongo::disconnected');
  });


  connection.once('open', function () {
    debug('connected');
  });

  connection
    .on('connected', function () {
      debug('Mongoose default connection open to ' + dbURL);
    })
    .on('error', function (err) {
      debug('Mongoose default connection error: ' + err);
    })
    .on('disconnected', function () {
      debug('Mongoose default connection disconnected');
    });

  process.on('SIGINT', function () {
    connection.close(function () {
      debug('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  //Set debug mode for dev environment
  var env = process.env.NODE_ENV || 'local';
  if (env === 'development') {
    mongoose.set('debug', true);
  }

  //Init model models
  debug('initializing model models');

  schemaFiles.forEach(function (file) {
    require(modelsPath + '/' + file);
    debug('model schema initialized: %s', file);
  });
};