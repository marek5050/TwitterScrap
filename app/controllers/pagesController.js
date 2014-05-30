var locomotive = require('locomotive')
  , util = require('util')
  , Controller = locomotive.Controller;
  
var pagesController = new Controller();


pagesController.main = function() 
{
  this.title = 'Locomotive';
  this.render();
}

module.exports = pagesController;
