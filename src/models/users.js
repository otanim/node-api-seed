var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var UserSchema = new Schema({
  fullName: SchemaTypes.String,
  login: SchemaTypes.String,
  password: SchemaTypes.String,
  deleted: SchemaTypes.Boolean
});

mongoose.model('User', UserSchema);