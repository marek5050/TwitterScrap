var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var tupleSchema = new Schema({
  first: {type: String, required:true}
, fType: {type: String, required:true}
, last: {type: String, required:true}
, lType: {type: String, required:true}
,

});

module.exports = mongoose.model('tupleSchema', tupleSchema);