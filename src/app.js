'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('app');

var cors = require('cors');

debug('loading configuration');
var config = require('./config');

var initializers = global.initializers = require('./init')(config);

var app = express();
app.config = config;

app.use(cors());

app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.set('env', config.env);

debug('Initializing express: /api server');
var api = require('./api');

app.use('/api', api);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// catch 500 and forward to error handler
app.use(function (err, req, res, next) {
  res.sendStatus(err.status || 500);
});

module.exports = app;
