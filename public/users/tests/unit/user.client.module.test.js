describe('Testing Module Existance', function() {
    var mainModule;
    beforeEach(function() {
        mainModule = angular.module('bookClub');
    });
    
    it('Should be registered', function() {
        expect(mainModule).toBeDefined();
    });
});

describe('Testing user Module', function() {
    var userModule;
    beforeEach(function() {
        userModule = angular.module('users');
    });
    it('Should be registered user', function() {
        expect(userModule).toBeDefined();
    });
});