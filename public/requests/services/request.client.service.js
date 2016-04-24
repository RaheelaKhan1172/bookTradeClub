angular.module('request').factory('RequestService', [ '$http', function($http) {
    
    return {
        post: function(data,cb) {
            $http({
                url:'/api/trade',
                method: 'POST',
                data:data
            }).then(function(response) {
                cb(response);
            }, function(error) {
                cb(response)
            });
        },
        
        update: function(id,data,cb) {
            $http({
                url: '/api/trade/'+id,
                method: 'PUT',
                headers: {selected: data}
            }).then(function(res) {
                cb(res);
            }, function(err) {
                cb(err);
            });
        },
        
        get: function(id,cb) {
            $http({
                url: '/api/trade/' + id,
                method: 'GET'
            }).then(function(res) {
                cb(res);
            }, function(err) {
                cb(err);
            });
        } 
    }
    
}]);