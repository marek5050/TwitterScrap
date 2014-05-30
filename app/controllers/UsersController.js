 
var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , _ = require('lodash')
  , sentiment = require('sentiment');


var usersController = new Controller();
var async = require('async');

twitsController = require('./TwitsController.js');
usersController._model = require('../models/twit');
usersController._entityModel = require('../models/entity');
usersController._userModel = require('../models/twituser');
usersController._relationModel = require('../models/relation');

usersController.findRelations = function(filter,callback)
{
  var self = this;
  self._relationModel.findOne(filter, function(err,item){
    if(err) callback(err,null);
    else callback(null,item);
  })
return;
}

usersController.sentiment = function(data){
  var self = this;

  if(data!=null){
   var text=  _.map(data, function(item){return item.text});


    console.log("Data:  ", text.join('.'));

    var results = sentiment(text.join('.'));
    console.log("Results" + util.inspect(results));
    return;
  }else{
//    var user = self.param('user');
    console.log("Start");
    var f = {'user.screen_name': 'iPhoneAppDeal'};
    twitsController.findTwits(f,usersController.sentiment);
  }
}


usersController.list = function()
{
 var self = this;
 // console.log("List: " + util.inspect(self) + "---------List: " + self.req.query);
 var query = self.req.query.items;
 query = query.split(',');

 var hashList = _.filter(query, function(item){ if(item.indexOf('#')==0) return 1});
 
 
 console.log("Hashlist: "+ hashList.length + "Items: " + hashList);
 var str = "^"+hashList.join('$|^')+"$";

 console.log("Regular expression: " + str);

 self._relationModel.find({'firstStr': new RegExp(str,'i')},function(err,items){

 if(err) console.log("Query resulted in an error: " + err);
 if(items.length > 0 ){
 var eachTop10= _.map(items,function(item)
      {
        // console.log("Item: "+ item);
         var o = item.toObject();
         var pairs = _.pairs(o.rest);
         var final10 = _.sortBy(pairs, _.last).reverse();

         var users = [];
         var hashtags = _.filter(final10,function(item){ if(_.first(item).indexOf('@')==0){users.push(item);} else if(_.first(item).indexOf('#')==0) return 1; });

         var topUsers = users.slice(0,10);
         var topHash = hashtags.slice(0,10); 

         return {'name': item.firstStr, 'related':topHash, 'users': topUsers};
      });

 // _.map(eachTop10, function(item){console.log("Each---: "+ util.inspect(item))});

self.respond({
    'json': function() { self.res.json({result: eachTop10}); },
    })
  }else{
    console.log("No items retreived.");
   }
 });
}





module.exports = usersController;
