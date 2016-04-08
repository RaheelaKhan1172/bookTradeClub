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

exports.user = function(req,res,next) {
    
    if (req.headers.data) {
        User.findOne({email: req.headers.data}, '-password -salt -provider').populate(' books requests').exec(function(err,user) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.json(user);
            }
        });
        
      /*  var dataToSend = {
            email: req.user.email,
            firstName: req.user.firstName,
            id: req.user._id
        }
        
        res.json(dataToSend);
    } else {
        res.json(null);
    } */
    }
};

exports.signup = function(req,res,next) {
  if (!req.user) {
      var user = new User(req.body); //req.body === form
      var message = null;
      user.provider = 'local';
      if (user.email) {
          user.email = user.email.toUpperCase();
      } else {
          return res.status(400).end('Please enter a valid email address');
      }
      console.log('the user',user);
      user.save(function(err) {
          if (err) {
              console.log('ane rror')
              var message = getErrorMessage(err);
              return res.status(400).end(message); // response.end to send multiple messages to same view w/o error
          }
          //manual call for req.login used for registering new users
          req.login(user,function(err) {
              if (err) {
                  console.log('or here',err);
                  
                  return res.status(400).end(err);
                  
              } else {
                  console.log('hello hey');
                   res.status(200).json({
                      firstName: user.firstName,
                      email: user.email
              });
              }
          });
      });
  } else {
      return res.redirect('/');
  } 
};

exports.handleResults = function(req,res,next) {
    //add stuff
    var data = {
        firstName: req.firstName,
        email: req.email
    };
    
    return res.status(200).json(data);
    
};

exports.signout = function(req,res) {
    req.logout();
    res.redirect('/');
};