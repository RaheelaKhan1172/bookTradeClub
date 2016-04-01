var users = require ('../controllers/user.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
    .get(users.renderSignUp)
    .post(users.signup);
    
    app.route('/signin')
    .get(users.renderSignIn)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    }));
    
    app.get('/signout', users.signout);
}