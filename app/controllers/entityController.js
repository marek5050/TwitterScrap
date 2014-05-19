 
var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , _ = require('lodash');

var entityController = new Controller();
var async = require('async');

entityController._model = require('../models/twit');
entityController._twitUserModel = require('../models/twitUser');
entityController._entityModel = require('../models/entity');
entityController._relationModel = require('../models/relation');

entityController.bind = function(entity)
{
   var tweet = tweetOriginal;
   var self = this;
   self.entities(tweet.entity);

// self.buildRelations(tweet.entity);


// //  console.log("We have the model: "+ util.inspect(entityController._model));
//   var _tweet = new self._model(tweet);
//   var _user = new self._twitUserModel(tweet.user);
//   var elem;
//   while(elem = tweet.entity.hashtags.pop()){
//  	console.info("------------------------------\n");
//    	console.log("Captured hashtag: " + elem);
//    	console.info("------------------------------\n");
//    	self._entityModel.findOne({name: elem}, (function(err, hashtag){

//    		var tweet = tweetOriginal;
//    		if(err != elem){
//    			console.log("Could not locate hashtag.  " + err + "\n");
//    		}
// /* 
//   If we find the entity we build relations
// */   		
//       if(hashtag){
//    			console.log("Got hashtag! " + util.inspect(hashtag) + "\n");
//         entityController.buildRelations(entity,tweet.entity);
//    		}

// /*
//   If not build the entity first, then build relations
// */
//    		if(err && !hashtag){
//    		    var ht = new self._entityModel();
//    		    console.info("Elem is: " + elem);
// 			ht.name = elem;
// 			ht.save(function(err, entity){
// 		   		console.info("------------------------------\n");
// 			   	if (err ) 
//             console.log("Error creating hashtag: " + err );
// 			   	else
//           {
//             var tweet_elem ; 
//             entityController.buildRelations(entity,tweet.entity);
//           }
//       console.log("Successfully created hashtag." + util.inspect(hashtag));    
//   		console.info("------------------------------\n");
//    });
//   }
//  })(elem,tweetOriginal));
// }

  // _tweet.save(function(err){
  // 	if(err) console.log("We received an error saving tweet: "+ err);
  // 	else console.log("Tweet saved \n");

  // });



  // console.info("------------------------------\n");
  // console.log("User: " + util.inspect(_user));
  // console.info("------------------------------\n");
  // console.log("Tweet: " + util.inspect(_tweet));

}

entityController.buildRelationsHelper = function(entity, entities, callback)
{
  var self = this;
// console.log("Relations Helper: "+ entity);
// console.log("Entities: " + entities.join());
  self._entityModel.findOne({name: entity}, function(err, doc ){
    if(doc && !doc._id || doc == null)
       {
        console.log("Failed to find entity: "+ entity); 
        console.log("Returned: "+ util.inspect(doc));
        callback(); 
        return; 
       }
    // console.log("Found: "+ doc);
    self._relationModel.findOne({first: doc._id}, function(err,rel)
    {
      if(rel && !rel.first)
        {
          // console.log("Failed to find relation "+ doc._id); 
          callback();
          return; 
        }
      // console.log("Found rel: " + util.inspect(rel));
//

//
     for(var i = 0; i < entities.length; i++)
     {
       // console.log("Looking for the entity: "+ entities[i] + " in " + entity);
       // console.log("inspecting: " + typeof rel.get(entities[i])); 
     if("undefined" != typeof rel.get("rest."+entities[i]))
      {
         // console.log("Found entity. " + entities[i]);
         var count = rel.get("rest."+entities[i]);
         rel.set("rest."+entities[i],count+1);
      }else{
         // console.log("Did not adding entity... "+ entities[i] 
          // + "\n in " + util.inspect(rel.rest));
         // console.log("Entities[i]: " + entities[i]);
         rel.set('rest.'+entities[i], 1);     
     }
    }

   rel.markModified('rest'); 
   rel.save(function(err, item){
      if(err){
        console.log("REL Save ERROR: "+ err);
      }else{
         console.log("Saved the updated entity. ");
      }
       callback();
     })
   })
  }); 
}

entityController.buildRelations = function(entities, callback)
{ 

var self = this;
console.log("Entities " + util.inspect(entities));
async.eachSeries(
     entities
   , function(item,callback){self.buildRelationsHelper(item , entities, callback) }
   , function(err){ 
    if(err) console.log("buildRelations: Error " + err);
    else {
      console.log("Hashtag Relationship building complete.");
      }
});
callback();
return;
}

entityController.createURLS = function(entities, callback){
var urls = _.map(entities, function(item){ return item.display_url});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createHashtags returned error. ");
      else console.log("createHashtags succesful");
      callback();
      return;
  })
 }
}

entityController.createSymbols = function(entities, callback){
var urls = _.map(entities, function(item){ return item.text});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createHashtags returned error. ");
      else console.log("createHashtags succesful");
      callback();
      return;
  })
 }
}

entityController.createUser_Mentions = function(entities, callback){
var urls = _.map(entities, function(item){ return item.id});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createHashtags returned error. ");
      else console.log("createHashtags succesful");
      callback();
      return;
  })
 }
}

entityController.createHashtags = function(entities, callback){

  async.parallel(entities, function(item,callback) { createEntity(item.text, callback)}, 
    function(err){
      if(err) console.log("createHashtags returned error. ");
      else console.log("createHashtags succesful");
      callback();
      return;
  })
}

entityController.createEntity = function(entity, callback){
  var self = this;
  console.log("Checking " + entity);
  self._entityModel.findOne({name: entity},function(err, doc){
    if(err){
      console.log("Entity does not exist creating entity. " + err + " _entity: "+ _entity);
      callback();
      return;
    }
//    console.log("DOC: " + typeof doc + " is: " + doc);

    if(doc && doc.name){
      console.log("Entity exits." );
      //+ util.inspect(doc));
      callback();
      return;
    }
      self._entityModel.create({name: entity},function(err, item){
        if(err){
          console.log("There was a problem creating entity. " + err);
          callback(err);
        }else{
          console.log("Created the entity " + util.inspect(item));
          entityController.createRelation(item, callback);
        }
      })
    
  })
}


entityController.createRelation = function(entity,callback){
  var self = this;
  var _entity = entity;
  console.log("Checking relationship: " + entity._id);
  self._relationModel.findOne({first: entity._id}, function(err, doc){
    if(err){
      console.log("createRelation Find Error");
      callback();
      return;
    }
    if(doc && doc.first){
      console.log("createRelation Find Success");
      callback();
      return;
    }

      console.log("Relation does not exist, creating....")
      self._relationModel.create({first: _entity._id, firstStr: _entity.name} ,function(err, item){
        if(err){
          console.log("There was a problem creating relation. " + err);
        }else{
          console.log("Created the relation for entity " + _entity._id);
        }
          callback();
      })
  })
}


entityController.prepEntities = function(entities)
{
  var self = this;
//  console.log("Entities.hashtags: " + util.inspect(entities));
   var hashtags = _.map(entities.hashtags, function(item){ return "#"+item.text.toLowerCase()});
   var user_mentions = _.map(entities.user_mentions, function(item){return "@"+item.id});
   var symbols = _.map(entities.symbols, function(item){return "%"+item.text.toLowerCase()});
   var URLS = _.map(entities.urls, function(item){return item.display_url.replace(".","[dot]").toLowerCase()});

// console.log("Lengths URLS " + util.inspect(URLS) + " SYMBOSL: "+ symbols.length + "Hashtags: "+ util.inspect(hashtags));

var items = _.union(hashtags, user_mentions,symbols, URLS);

// console.log("Items: " + items.length + "Inspect: " + util.inspect(items)); 

// console.log("Preparing Entities " + util.inspect(i) 
//             + " Hashtags: " + entities.hashtags);

async.each(items, function(item,callback){
      self.createEntity(item, callback);
    }


  // [function(callback){
  //             self.createHashtags(entities.hashtags,callback);
  //           },function(callback){
  //             self.createSymbols(entities.symbols,callback);
  //           },function(callback){
  //             self.createURLS(entities.urls,callback);
  //           },function(callback){
  //             self.createUser_Mentions(entities.user_mentions,callback);
  //           }]
    ,function(err){
     if(err){
       console.log("Produced an error!");
     }else{
      self.buildRelations(items, function(err){console.log("Error " + err)});
      console.log("No error produced!");
    }
});



    // var string = hashtags.join('|');
    // console.log("Looking for: " + string);
    
    // self._entityModel.findOne({first:/string/i, last: /string/i}, (function(err, entity)
    // {
    //   if(err != hashtags)
    //   {
    //     console.log("We have an error: "+ err);
    //   }

    //   if(!entity)
    //    {
    //      console.log("There's no entity need to create\n");
    //      var i=1;
    //      var ht = new self._tupleModel();
    //      ht.first = hashtags[0];
    //      ht.ftype = "hashtag";
    //      for(; i<hashtags.length; i++)
    //       {
    //        ht.rest.push({second: hashtags[i],value: 0});
    //       }
    //     }
    //   else if(entity)
    //   {
    //         console.log("There's an entity with the associated tags \n" + entity);
    //  }

    // })(hashtags));
 // }

  return 0;
}


/*


*/

entityController.show = function() 
{
  this.title = 'Locomotive';
  var T = this.__app.T;

// var Twit = require('twit')

// var T = new Twit({
//     consumer_key:         'WWQZpzCKGpQUopv9OaH0pej0D'
//   , consumer_secret:      'Zqf8t7LcI4PqW7Phw1twGBbzVZlaYHQbrJQO2eQd6LoR0v3gmt'
//   , access_token:         '342515445-5zVfILUN0pIrqcYDeOMhX47fpcZ0B9Y1MUWS2IbN'
//   , access_token_secret:  'ENCPlBwHrwPgokQX8ZvUkQE2MlylQqrYJSShs4oaTKyyi'
// })


 // T.get('search/tweets', { q: 'banana since:2011-11-11', count: 100 }, function(err, data, response) {
 //  console.log(data)
 // })
 // console.log("Preparing entities ");
 //  entityController.prepEntities(str);


// console.log("Initializing twit.");
}
// var stream = T.stream('statuses/filter', { track: '#crossfit', language: 'en' })
//    console.log("Fetching tweets \n");

// 	stream.on('tweet', function (tweet) {
// 	   console.log("Got tweet: " + util.inspect(tweet));
// 	  entityController.collect(tweet);
// 	})
// //  this.render('../views/pages/main');
// }

module.exports = entityController;
