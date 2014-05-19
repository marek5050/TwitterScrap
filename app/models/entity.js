var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

var entitySchema = new Schema({
  name: String
  , value: {type: Number, default:0}
  , parent: [Schema.ObjectId]
  , siblings: [Schema.ObjectId]
  , relevant: [Schema.ObjectId]
  ,
});

module.exports = mongoose.model('entitySchema', entitySchema);