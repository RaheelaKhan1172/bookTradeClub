var app = require('../../server.js'),
    should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Trade = mongoose.model('Trade'),
    User = mongoose.model('User'),
    Book = mongoose.model('Book');

var user,book,trade;

describe("Testing trade methods",function() {
    it('Should save without problems',function(done) {
        trade = new Trade({
            status: 'Available'
        })
        
        trade.save(function(err) {
            expect(200,done);
        });
    });
    
    it("Should update without problems", function(done) {
      request(app)
        .put('/api/trade/:id')
        .expect(200,done);
    });
    
});

afterEach(function(done) {
    Trade.remove(function() {
        done();
    });
});