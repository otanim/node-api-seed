function createConfig() {
  var env = process.env.NODE_ENV || 'local';
  var config = require('./config')[env];
  config.env = env;
  return require('./config')[env];
}

module.exports = createConfig();