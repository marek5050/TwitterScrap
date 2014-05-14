module.exports = function() {

  this.mongoose = require('mongoose');

  switch (this.env) {
    case 'development':

      this.mongoose.connect("mongodb://127.0.0.1");  

//      this.mongoose.connect('mongodb://localhost/Wolf');
      break;
    case 'production':
//      this.mongoose.connect('mongodb://localhost/');
      break;
  }

  this.mongooseTypes = require("mongoose-types");
  this.mongooseTypes.loadTypes(this.mongoose);


//  this.mongoose.model('User', schemas.UserSchema);
//  this.mongoose.model('Post', schemas.PostSchema);
}