var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username,password,done) {
        User.findOne({
            username: username
        }, function(err,user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null,false, {
                    message: "Can't find that username! Try again or register!"
                });
            }
            if (!user.authenticate(password)) {
                return done(null,false, {
                    message: "Wrong password! Try again"
                });
            }
            //no errors, user document is found
            return done(null,user);
        });
    }));
};