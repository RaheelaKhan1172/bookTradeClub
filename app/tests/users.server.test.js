var app = require('../../server.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var user;

describe('Testing save method', function() {
    it('Should save without problems', function() {
        user = new User({
          firstName: 'First',
          lastName: 'Last',
          email: 'TEST@TEST.COM',   
          password: 'password'
        });

        user.save(function(err) {
            should.not.exist(err);
        });
    });
    it('Should not save user without firstname, lastname, password, and email', function() {
       user.firstName = '';
        user.lastName = '';
        user.password = '';
        user.email = '';
        
        user.save(function(err) {
            should.exist(err);
        });
    });
});

afterEach(function(done){
    User.remove(function() {
        done();
    });
});
