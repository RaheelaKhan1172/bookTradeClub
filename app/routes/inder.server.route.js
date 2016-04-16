module.exports = function(app) {
  var index = require ('../controllers/index.server.controller');
  var fake = require('../controllers/lib/fakestuff');
  app.route('/')
  .get(fake.getData);
    
}
