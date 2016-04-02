var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');
    console.log('hello');
    passport.serializeUser(function(user,done) {
        console.log('hi', user);
        done(null,user.id);
    });
    
    passport.deserializeUser(function(id,done) {
        User.findOne({
            _id: id
        }, '-password -salt', function(err,user) {
            done(err,user);
        });
    });
    
    require('./strategies/passport.local.js')();
    
}