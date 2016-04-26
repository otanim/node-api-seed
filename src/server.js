var debug = require('debug')('server');
var app = require('./app');
var config = app.config;

app.set('port', config.PORT);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});
