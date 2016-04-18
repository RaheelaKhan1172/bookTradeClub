'use strict';

describe('testing http requests' , function() {
    
    it('should produce 200 status code for GET request', inject(function($http) {
        
        var $scope = {};
        
        $http.get('/api/requests')
            .success(function(data,status,headers,config) {
            $scope.valid = true;
            $scope.response = data;
        }).error(function(data,status,headers,config) {
            $scope.valid = false;
        });
        
        $httpBackend.when('GET', 'http://localhost/foo')
                    .respond(200, {data:'stuff'})
        
        $httpBackend.flush();
        
        expect($scope.valid).toBe(true);
        expect($scope.response).toEqual({data:'stuff'});
        
        
    }));
});