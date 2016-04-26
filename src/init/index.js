var fs = require('fs');
var path = require('path');
var debug = require('debug')('init:index');

module.exports = function (config) {
  var pathOfInitDirectory = __dirname;
  var listOfInitializers = fs.readdirSync(__dirname);
  var initializers = {};
  listOfInitializers.forEach(function (js) {
    if (js === 'index.js') {
      return;
    }

    debug('initializing ' + js);
    var pathOfInitializer = path.join(pathOfInitDirectory, js);
    var initializer = require(pathOfInitializer);

    var nameOfInitializer = js.match(/(.*)\.js/)[1];
    initializers[nameOfInitializer] = initializer(config);
  });
  return initializers;
};
