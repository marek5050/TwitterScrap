 
var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller
  , entityController = require('./entityController.js');

var twitController = new Controller();

twitController._model = require('../models/twit');
twitController._twitUserModel = require('../models/twitUser');
twitController._entityModel = require('../models/entity');

twitController.collect = function(tweetOriginal)
{
  var tweet = tweetOriginal;
  var self = this;

//  console.log("We have the model: "+ util.inspect(twitController._model));

  var _tweet = new self._model(tweet);
  // var _user = new self._twitUserModel(tweet.user);
  // var elem;
  // if(tweet.entity){
  // 	console.log("Creating hashtags \n");
  // 	entityController.hashtags(tweet.entity.hashtags);
  // 	console.log("Creating symbols \n");
  // 	entityController.symbols(tweet.entity.symbols);
  // 	console.log("Creating urls \n");
  // 	entityController.urls(tweet.entity.urls);
  // 	console.log("Creating user_mentions \n");
  // 	entityController.user_mentions(tweet.entity.user_mentions);
  // }
};

twitController.prepUser = function(user){
   var self = this;
   console.log("Given: " + util.inspect(user));
   self._twitUserModel.create(user,function(err,u)
	{
	   console.log("Created user: "+ util.inspect(u));
	  if(!err) console.log("PREPUSER Success: " + u.name);
	  else console.log("PREPUSER Error: " + err);
	});
}



twitController.show = function() 
{
  this.title = 'Locomotive';

  var T = this.__app.T;
  
  var str = { 
  	created_at: 'Sun May 18 04:13:35 +0000 2014',
  id: 467880656375410700,
  id_str: '467880656375410688',
  text: 'RT @apprankjp: Japan Game Paid 42. Grand Theft Auto: Vice City - Rockstar Games http://t.co/oOCAseKJAS #iTunes #iPhone #Apps #Apple',
  source: '<a href="https://roundteam.co" rel="nofollow">RoundTeam</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: 
   { id: 2180120179,
     id_str: '2180120179',
     name: 'Michael De Santa',
     screen_name: 'HeistMaster',
     location: 'Los Santos, San Andreas',
     url: null,
     description: 'I am a family man and a damn good thief. (Parody Account) #GTAV #GrandTheftAuto (Not Affiliated with #RockstarGames) Bodyguard to: @ParasiteAya',
     protected: false,
     followers_count: 2352,
     friends_count: 52,
     listed_count: 11,
     created_at: 'Thu Nov 07 13:39:42 +0000 2013',
     favourites_count: 13,
     utc_offset: null,
     time_zone: null,
     geo_enabled: false,
     verified: false,
     statuses_count: 140420,
     lang: 'en',
     contributors_enabled: false,
     is_translator: false,
     is_translation_enabled: false,
     profile_background_color: 'C0DEED',
     profile_background_image_url: 'http://pbs.twimg.com/profile_background_images/378800000111219034/0f281f8a15f9dca2f4400929387e9e79.jpeg',
     profile_background_image_url_https: 'https://pbs.twimg.com/profile_background_images/378800000111219034/0f281f8a15f9dca2f4400929387e9e79.jpeg',
     profile_background_tile: false,
     profile_image_url: 'http://pbs.twimg.com/profile_images/378800000707304097/9ca0e99eefb8caf005e9b522038a1e27_normal.jpeg',
     profile_image_url_https: 'https://pbs.twimg.com/profile_images/378800000707304097/9ca0e99eefb8caf005e9b522038a1e27_normal.jpeg',
     profile_banner_url: 'https://pbs.twimg.com/profile_banners/2180120179/1383832410',
     profile_link_color: '007007',
     profile_sidebar_border_color: '000000',
     profile_sidebar_fill_color: 'DDEEF6',
     profile_text_color: '333333',
     profile_use_background_image: true,
     default_profile: false,
     default_profile_image: false,
     following: null,
     follow_request_sent: null,
     notifications: null },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  retweeted_status: 
   { created_at: 'Sun May 18 03:59:25 +0000 2014',
     id: 467877090314821600,
     id_str: '467877090314821632',
     text: 'Japan Game Paid 42. Grand Theft Auto: Vice City - Rockstar Games http://t.co/oOCAseKJAS #iTunes #iPhone #Apps #Apple',
     source: '<a href="http://sas.pt106.net" rel="nofollow">iPhone アプリ ランキング 日本</a>',
     truncated: false,
     in_reply_to_status_id: null,
     in_reply_to_status_id_str: null,
     in_reply_to_user_id: null,
     in_reply_to_user_id_str: null,
     in_reply_to_screen_name: null,
     user: 
      { id: 503196394,
        id_str: '503196394',
        name: 'iPhone Top AppStore ',
        screen_name: 'apprankjp',
        location: '',
        url: 'http://j.mp/YolpPN',
        description: 'http://j.mp/1mMfen3 iPhone AppStore Rank \r\nUnited States,\r\nChina,\r\nKorea,\r\nUnited Kingdom,\r\nFrance,\r\nAustralia,\r\nGermany,\r\nJapan,\r\nhttp://j.mp/YolpPN',
        protected: false,
        followers_count: 686,
        friends_count: 464,
        listed_count: 94,
        created_at: 'Sat Feb 25 16:02:11 +0000 2012',
        favourites_count: 0,
        utc_offset: 32400,
        time_zone: 'Irkutsk',
        geo_enabled: false,
        verified: false,
        statuses_count: 107872,
        lang: 'ja',
        contributors_enabled: false,
        is_translator: false,
        is_translation_enabled: false,
        profile_background_color: '131516',
        profile_background_image_url: 'http://abs.twimg.com/images/themes/theme14/bg.gif',
        profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme14/bg.gif',
        profile_background_tile: true,
        profile_image_url: 'http://pbs.twimg.com/profile_images/1852948755/114x114_normal.png',
        profile_image_url_https: 'https://pbs.twimg.com/profile_images/1852948755/114x114_normal.png',
        profile_link_color: '009999',
        profile_sidebar_border_color: 'EEEEEE',
        profile_sidebar_fill_color: 'EFEFEF',
        profile_text_color: '333333',
        profile_use_background_image: true,
        default_profile: false,
        default_profile_image: false,
        following: null,
        follow_request_sent: null,
        notifications: null },
     geo: null,
     coordinates: null,
     place: null,
     contributors: null,
     retweet_count: 1,
     favorite_count: 0,
     entities: 
      { hashtags: [Object],
        symbols: [],
        urls: [Object],
        user_mentions: [] },
     favorited: false,
     retweeted: false,
     possibly_sensitive: false,
     lang: 'en' },
  retweet_count: 0,
  favorite_count: 0,
  entities: 
   { hashtags: [ {text: "@hello"}, {text: "@Boom "}, {text: "@hsuagae"} ],
     symbols: [],
     urls: [ {display_url: "@URLLL"}],
     user_mentions: [{id: "112313"} ] },
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  filter_level: 'medium',
  lang: 'en' }

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


  var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })
    console.log("Fetching tweets \n");

  	stream.on('tweet', function (tweet) 
  	{

 	  console.log("Got tweet: " + util.inspect(tweet));

 	//   console.log("Got tweet: " + util.inspect(tweet.entities));
	   
	   entityController._model.create(tweet,function(err,item){
	 if(err) console.log("Error creating twit: " + err);
	 if(item && item.entities)
	   	 {
	   	 	   console.log("Created succesfuly " + item.text);
	   	   // console.log("Created succesfuly " + util.inspect(str.entities));
	 if(item.user.followers_count > 1000)
	 {
	  	// console.log("Original user: " + item.user);
	   twitController.prepUser(item.user);
	 }

	           // if(item.retweeted_status && item.retweeted_status.user > 1000){
	           // 		console.log("Retweeted user: " + item.retweeted_status.user);
	           // 		twitController.prepUser(item.retweeted_status.user);
	           // }
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
module.exports = twitController;
