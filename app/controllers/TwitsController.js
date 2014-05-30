 
var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , entityController = require('./EntitiesController.js');

var twitsController = new Controller();

twitsController._model = require('../models/twit');
twitsController._twitUserModel = require('../models/twituser');
twitsController._entityModel = require('../models/entity');

twitsController.collect = function(tweetOriginal)
{
  var tweet = tweetOriginal;
  var self = this;

  var _tweet = new self._model(tweet);

};

twitsController.prepUser = function(twit){
   var self = this;
   var twitstr = twit.user;
   var user = twitstr.toObject();

   var u = new self._twitUserModel(user);

   u.save(function(err, item){
   	 if(err) console.log("Error saving u.");
   	 else console.log("Saved u." + item.screen_name);
   })
}

twitsController.findTwits= function(filter,callback){
  var self = this;
  self._model.find(filter,function(err,items){
    if(err)
    {
      console.log("Error: "+ err); return; 
    }
    
    if(items.length == 0)
    {
      return;
    }
    
    console.log("We found items: " + util.inspect(items));
    callback(items);
  })
}


twitsController.showme = function() 
{
  this.title = 'Locomotive';

  var T = this.__app.T;
	var Twit = require('twit')

	var T = new Twit({
	    consumer_key:         'WWQZpzCKGpQUopv9OaH0pej0D'
	  , consumer_secret:      'Zqf8t7LcI4PqW7Phw1twGBbzVZlaYHQbrJQO2eQd6LoR0v3gmt'
	  , access_token:         '342515445-5zVfILUN0pIrqcYDeOMhX47fpcZ0B9Y1MUWS2IbN'
	  , access_token_secret:  'ENCPlBwHrwPgokQX8ZvUkQE2MlylQqrYJSShs4oaTKyyi'
	})

	 // T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
	 //  console.log(data)
	 // })

  var stream = T.stream('statuses/filter', { track: '@crossfit,#crossfit,#apple,@itunesradio,@apple', language: 'en', filter_level: 'medium' })
    console.log("Fetching tweets \n");

  	stream.on('tweet', function (tweet) 
  	{

 	  // console.log("Got tweet: " + util.inspect(tweet));
 	  // console.log("Type of tweet: " + typeof tweet);
 	//   console.log("Got tweet: " + util.inspect(tweet.entities));
	   
	   entityController._model.create(tweet,function(err,item){
	 if(err) console.log("Error creating twit: " + err);
	 if(item && item.entities)
	   	 {	

	   	 	   console.log("Created succesfuly " + item.text);
	   	   // console.log("Created succesfuly " + util.inspect(str.entities));
	 item.entities.user_mentions=[];
   if(item.user.followers_count > 1000)
	 {
	   twitsController.prepUser(item);
     item.entities.user_mentions=[{id: item.user.screen_name, followers_count: item.user.followers_count}];
	 }

	  entityController.prepEntities(item.entities);
    }else{
	  console.log("Created item no entities: " + util.inspect(item));
   }
   });
})

this.render('../views/pages/main');
//entityController.prepEntities(str.entity);

console.log("Initializing twit.");
}
module.exports = twitsController;
