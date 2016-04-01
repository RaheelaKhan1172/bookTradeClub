process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3030);

module.exports = app;
