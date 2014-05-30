// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {

  this.root('twits#showme');
  this.resource('twit');
  this.match('entity/:entity.:format?',"entities#showme");
  this.match('users/list.:format?',"users#list");
  this.match('users/sentiment',"users#sentiment");



   // this.resource('entity',function(){
   // 	   this.match("show", "entity#show");
   // });
   // // this.resource('entity', function(){
   // 	this.match('account/:who.:format?', 'entity#show',{via:'get'});
   // });

}
