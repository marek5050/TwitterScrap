var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Locomotive';
  


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

var stream = T.stream('statuses/filter', { track: '#crossfit', language: 'en' })

stream.on('tweet', function (tweet) {
  console.log(tweet)
})

  this.render();

}

module.exports = pagesController;
