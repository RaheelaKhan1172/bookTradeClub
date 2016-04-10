var config = require('./configuration'),
  express = require('express'),
  compress = require('compression'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  flash = require('connect-flash'),
  busboy = require('connect-busboy');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }
  
  app.use(bodyParser.urlencoded({
    extended: true
  }));
    
  app.use(bodyParser.json());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret  
  }));

  app.use(busboy());
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  
  require ('../app/routes/inder.server.route.js')(app);
  require('../app/routes/user.server.route.js')(app);
  require('../app/routes/book.server.route.js')(app);
    
  app.use(express.static('./public'));

    //404 errors
  require('../app/routes/error.server.route.js')(app);
    
  return app; 
}
