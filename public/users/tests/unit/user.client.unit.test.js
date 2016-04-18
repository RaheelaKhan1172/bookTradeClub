'use strict';

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
    var test,scope,controller;
    beforeEach(module('users'));
    
    beforeEach(inject(function($rootScope,$controller) {
       scope = $rootScope;
        userController = $controller('UserController', {
            $scope: scope
        });
    }));
               
    it('should be defined', function() {
        expect(scope).toBeDefined();
    });
    
    
});

