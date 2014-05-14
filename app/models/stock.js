var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Email = mongoose.SchemaTypes.Email;

//"Symbol","Name","LastSale","MarketCap","ADR TSO","IPOyear","Sector","industry","Summary Quote",

var UserSchema = new Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  }
  // eMail address
  email: { type: String, unique: true },
  
});



module.exports = mongoose.model('User', UserSchema);