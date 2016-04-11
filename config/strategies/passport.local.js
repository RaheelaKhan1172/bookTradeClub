var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');
    
module.exports = function() {
    passport.use(new LocalStrategy(function(username,password,done) {
        User.findOne({
            email: username
        }, function(err,user) {
            console.log('snap', err,user)
            if (user) {
                return done(null,user);
            } else {
            if (err || !user || !user.authenticate(password)) {
                console.log(err);
                return done(null,false,err);
            }
            }
          /*  if (!user) {
                console.log('hmhm')
                return done(null,false, {
                    message: "Can't find that username! Try again or register!"
                });
            }
            if (!user.authenticate(password)) {
                console.log('hoho');
                return done(null,false, {
                    message: "Wrong password! Try again"
                });
            } */
            //no errors, user document is found

        });
    }));
};