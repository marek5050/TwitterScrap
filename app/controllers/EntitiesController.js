 
var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , _ = require('lodash');

var entitiesController = new Controller();
var async = require('async');

entitiesController._model = require('../models/twit');
entitiesController._entityModel = require('../models/entity');
entitiesController._userModel = require('../models/twituser');
entitiesController._relationModel = require('../models/relation');

entitiesController.main = function()
{
  console.log("entit executing");
  this.render('../views/pages/main');
}

entitiesController.getUser = function(filter, options ,callback){
  var self = this;
  self._userModel.find(filter,null,options,function(err,item){
    if(err) callback(err, null);
    else callback(null,item);
  });
}

entitiesController.getEntity = function(filter,options,callback){
  var self = this;
  console.log("Filter: "+ util.inspect(filter));
  self._entityModel.find(filter,null,options,function(err,item){

    if(err) callback(err,null);
    else{
      console.log("Item: "+ item);
      callback(null,item);
    } 
  });
}

entitiesController.getRelations = function(filter,options,callback){
 var self = this;
  console.log("Filter: "+ util.inspect(filter));
  self._relationModel.find(filter,null,options,function(err,items){

    if(err) callback(err,null);
    else{
      // console.log("Returned: " + util.inspect(items));
      callback(null,items);
    } 
  }); 
}


entitiesController.showme = function()
{
  var self = this;
  var entity = self.param('entity');
  var format = self.param('format');
  // console.log("ENTITY: " + entity.indexOf('hash-'));

 if(!entity.indexOf('hash-')){
  entity = entity.replace('hash-','#');
 }else if(!entity.indexOf('user-')){
  entity = entity.replace('user-','@');
 }else if(!entity.indexOf('url-')){
  entity = entity.replace('url-','');
 }else if(!entity.indexOf('sym-')){
  entity = entity.replace('sym-','*');
 }
 
 if(entity =='') entity = "#apple";
 if(format == "json"){
  console.log("JSON FORMAT");
 }

self.title = "Entity";

//new RegExp('#.+',"i")}
self.getEntity({'name': entity},function(err, item)
{
if(err)
{
  console.log("ERROR showcase: "+ err + " looking for: "+ entity);
  self.error = "Problem retrieiving entity. "+ err;
}
if(item[0]){
   // self.entity = item[0].name;
   self.entity_id = item[0]._id;

if(item[0].relevant.length > 0)
 {

console.log("WE HAVE RELEVANT");
}else{
 self.getRelations({"firstStr": entity}, null,function(err,items)
   {
  if(err) {
    console.log("SHOWME Error: " + err);
    return 0;
   }
   if(items.length == 0){
     console.log("Nothing returned");
     return 0;
   }
   if(items.length > 0){
     console.log("Received" + util.inspect(items));
     items = _.first(items);
   }
   console.log("Items "+ items);
    
    var o = items.toObject();

    var pairs = _.pairs(o.rest);
    
    var final10 = _.sortBy(pairs, _.last).reverse();
    var top10Users=[];

    var top = _.filter(final10,
          function(item)
            {
             if(typeof _.last(item) == "number"){
                if(_.first(item).indexOf("@")==0)
                  {
                    // console.log("Found user"); 
                    top10Users.push(item);
                    return 0;
                  }                
                // console.log("Found entity");
                return 1;
             }});

    // console.log("Found " + top.length + "items: " + util.inspect(top));
    //console.log("Users Found " + top10Users.length + "items: " + util.inspect(top10Users));
    
    self.entity= _.first(top);
    self.relevant=_.rest(top).slice(0,10);
    self.entity_users = top10Users.slice(0,10);
    console.log("Top 10 users: " + self.entity_users);

    self.respond({
    'json': function() { self.res.json({ hello: 'world' }); },
     'html': {template: 'entity/main'}
    })
   })
  }
 }
  return;  
})

return;
}



entitiesController.buildRelationsHelper = function(entity, entities, callback)
{
  var self = this;
// console.log("Relations Helper: "+ entity);
// console.log("Entities: " + entities.join());
  self._entityModel.findOne({name: entity.name}, function(err, doc ){
    if(doc && !doc._id || doc == null)
       {
        console.log("Failed to find entity: "+ entity.name); 
        console.log("Returned: "+ util.inspect(doc));
        callback(); 
        return; 
       }
    console.log("Found: "+ doc);
    self._relationModel.findOne({'first': doc._id}, function(err,rel)
    {
      if(rel && !rel.first || rel == null)
        {
          console.log("Failed to find relation "+ doc._id); 
          callback();
          return; 
        }
      console.log("Found rel: " + util.inspect(rel));
//

//
     for(var i = 0; i < entities.length; i++)
     {
       console.log("Looking for the entity: "+ entities[i].name + " in " + entity.name);
       console.log("inspecting: " + typeof rel.get(entities[i].name)); 
     if("undefined" != typeof rel.get("rest."+entities[i].name))
      {
         console.log("Found entity. " + entities[i].name);
         var count = rel.get("rest."+entities[i].name);
         rel.set("rest."+entities[i].name,count + 1);
      }else{
         // console.log("Did not adding entity... "+ entities[i] 
          // + "\n in " + util.inspect(rel.rest));
         console.log("Entities[i]: " + entities[i].name);
         rel.set('rest.'+entities[i].name, 1);     
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

entitiesController.buildRelations = function(entities, callback)
{ 

var self = this;
console.log("Entities " + util.inspect(entities));
async.eachSeries(
     entities
   , function(item,callback){console.log("Item: " + item); self.buildRelationsHelper(item , entities, callback) }
   , function(err){ 
    if(err) console.log("buildRelations: Error " + err);
    else 
    {
      console.log("Hashtag Relationship building complete.");
    }
});
callback();
return;
}

entitiesController.createURLS = function(entities, callback){
var urls = _.map(entities, function(item){ return item.display_url});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createURLS returned error. ");
      else console.log("createURLS succesful");
      callback();
      return;
  })
 }
}

entitiesController.createSymbols = function(entities, callback){
var urls = _.map(entities, function(item){ return item.text});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createSymbols returned error. ");
      else console.log("createSymbols succesful");
      callback();
      return;
  })
 }
}

entitiesController.createUser_Mentions = function(entities, callback){
var urls = _.map(entities, function(item){ return item.id});
if(urls.length > 0 )
 {
  async.parallel(entities, function(item,callback) { createEntity(item, callback)}, 
    function(err){
      if(err) console.log("createUser_Mentions returned error. ");
      else console.log("createUser_Mentions succesful");
      callback();
      return;
  })
 }
}

entitiesController.createHashtags = function(entities, callback){

  async.parallel(entities, function(item,callback) { createEntity(item.text, callback)}, 
    function(err){
      if(err) console.log("createHashtags returned error. ");
      else console.log("createHashtags succesful");
      callback();
      return;
  })
}

entitiesController.createEntity = function(entity, callback){
  var self = this;
  console.log("Checking " + entity);
  self._entityModel.findOne({name: entity.name},function(err, doc){
    if(err){
      console.log("Entity does not exist creating entity. " + err + " _entity: "+ _entity);
      callback();
      return;
    }

    if(doc && doc.name){
      console.log("Entity exits." );
      if(entity.type == 1){
        doc.followers_count = entity.followers_count;
        doc.save(function(err){if(err)console.log("Followers_count problem saving.")});
      }
      callback();
      return;
    }
       var model = {name: entity.name};
       if(entity.type ==1)
        model.followers_count = entity.followers_count;

       self._entityModel.create(model,function(err, item){
         if(err){
           console.log("There was a problem creating entity. " + err);
           callback(err);
         }else{
          console.log("Created the entity " + util.inspect(item));
          entitiesController.createRelation(item, callback);
        }
      })
  })
}


entitiesController.createRelation = function(entity,callback){
  var self = this;
  var _entity = entity;
  // console.log("Checking relationship: " + entity);
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
          ;
          console.log("Created the relation for entity " +util.inspect(item));
        }
          callback();
      })
  })
}


entitiesController.prepEntities = function(entities)
{
  var self = this;
//  console.log("Entities.hashtags: " + util.inspect(entities));
   var hashtags = _.map(entities.hashtags, function(item){ return {name: "#"+item.text.toLowerCase(),type:0}});
   var user_mentions = _.map(entities.user_mentions, function(item){return {name: "@"+item.id, followers_count: item.followers_count,type:1}});
   var symbols = _.map(entities.symbols, function(item){return {name: "%"+item.text.toLowerCase(), type:2}});
   var URLS = _.map(entities.urls, function(item){return {name: item.display_url.replace(".","[dot]").toLowerCase(), type:3}});

// console.log("Lengths URLS " + util.inspect(URLS) + " SYMBOSL: "+ symbols.length + "Hashtags: "+ util.inspect(hashtags));

var items = _.union(hashtags, user_mentions,symbols, URLS);

// console.log("Items: " + items.length + "Inspect: " + util.inspect(items)); 

// console.log("Preparing Entities " + util.inspect(i) 
//             + " Hashtags: " + entities.hashtags);

async.each(items, function(item,callback){
      self.createEntity(item, callback);
    } 
     ,function(err){
     if(err){
       console.log("Produced an error!");
     }else{
      self.buildRelations(items, function(err){if(err)console.log("BUILDRELATIONS: Error " + err)});
      // console.log("No error produced!");
    }
});
  return 0;
}


/*


*/

entitiesController.show = function() 
{
  this.title = 'Locomotive';
  var T = this.__app.T;
}

module.exports = entitiesController;
