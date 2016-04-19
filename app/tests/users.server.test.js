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
    
    it('Should update user without error', function() {
        user.city = "Some City";
        user.state = "Some State";
        request(app).post('/api/user/:id')
            .send({city:'some city', state: 'some state'})
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function(err, res) {
            res.status.should.equal(200);
            res.body.error.should.equal(false);
            done();
        });
    });
});

afterEach(function(done){
    User.remove(function() {
        done();
    });
});
