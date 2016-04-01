var config = require ('./configuration'),
  mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);
  
  require('../app/models/user.model.server');
    
  return db;
};
  
