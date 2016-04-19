var app = require('../../server.js'),
    should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Trade = mongoose.model('Trade'),
    User = mongoose.model('User'),
    Book = mongoose.model('Book');