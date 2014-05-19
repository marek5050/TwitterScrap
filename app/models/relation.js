var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var relationSchema = new Schema({
  first: Schema.ObjectId 
  , firstStr: String
  , type:  String
  ,
},{strict: false});

module.exports = mongoose.model('relationSchema', relationSchema);