var config = require ('./configuration'),
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  
  require('../app/models/user.model.server');
  require('../app/models/book.model.server');
  require('../app/models/trade.model.server');
    
  return db;
};
  
