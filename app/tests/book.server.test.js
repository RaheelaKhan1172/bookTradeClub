var app = require('../../server.js'),
    should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Book = mongoose.model('Book');

var user, book;

describe('Testing save method', function() {
    it ('Should save a book with user id and without an image', function(done) {
        user = new User({
            firstName: 'First',
            lastName: 'Kast',
            email: 'firstlast65@test.com',
            password:'123456789'
        });
        user.save(function(err){
            book = new Book({
                title:'Test',
                author: 'Test'
            });
            book.owner = user._id;
            
            book.save(function(err) {
                done();
            });
        });
    });
});

describe('Testing book GET method', function() {
    
    it('Should be able to get the list of books', function(done) {
        request(app).get('/api/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200)
        .end(function(err,res) {
            res.body.should.be.an.Array;
            done();
        });
    });
    
    it('Should be able to get a single book', function(done) {
        request(app).get('/api/books/' + book._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200)
        .end(function(err, res) {
            res.body.should.be.an.Object;
            done();
        });
    });
});



afterEach(function(done) {
    User.remove(function() {
        Book.remove(function() {
            done();
        });
    });
});