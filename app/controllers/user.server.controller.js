var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    
    if (err.code) {
        message = 'Something went wrong! Sorry, please try again!';
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
    
};

/*exports.renderSignIn = function(req,res,next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign In',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignUp = function(req,res,next) {
  if (!req.user) {
      res.render('signup', {
          title: 'Sign Up',
          messages: req.flash('error')
      });
  }  else {
      return res.redirect('/');
  }
}; */

exports.signup = function(req,res,next) {
  if (!req.user) {
      var user = new User(req.body); //req.body === form
      var message = null;
      user.provider = 'local';
      user.email = user.email.toUpperCase();
      user.save(function(err) {
          if (err) {
              var message = getErrorMessage(err);
              console.log('sent from hre?');
              res.json({message});
          }
          //manual call for req.login used for registering new users
          req.login(user,function(err) {
              if (err) {
                  console.log('or here',err);
                  
                  res.json({err});
              }
              return res.status(200).json({
                id: user._id
              });
          });
      });
  } else {
      return res.redirect('/');
  } 
};

exports.handleResults = function(req,res,next) {

};

exports.signout = function(req,res) {
    req.logout();
    res.redirect('/');
}