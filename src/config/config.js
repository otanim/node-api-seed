var env = process.env;
var config = {
  local: {
    DB: env.DB_URI || 'mongodb://localhost:27017/local',
    PORT: env.PORT || 3000
  },
  production: {
    DB: env.DB_URI || 'mongodb://localhost:27017/local',
    PORT: env.PORT || 5000
  }
};

module.exports = config;