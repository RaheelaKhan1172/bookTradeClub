var users = require ('../controllers/user.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
    .post(users.signup);
    
    app.route('/signin')
    .post(passport.authenticate('local'), function(req,res) {
        users.handleResults(req.user,res);
    });
    
    app.get('/api/user', users.user);

    app.get('/signout', users.signout);
}