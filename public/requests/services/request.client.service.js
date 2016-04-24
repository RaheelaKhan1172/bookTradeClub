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
        
        accept: function(id,cb) {
            $http({
                url: '/api/trade/accept/'+id,
                method: 'PUT'
            }).then(function(res) {
                cb(res,id);
            }, function(err) {
                cb(err);
            });
        },
        
        deny: function(id,cb) {
            $http({
                url: '/api/trade/deny/'+id,
                method: 'PUT'
            }).then(function(res) {
                cb(res,id);
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
        },
        
        remove: function(id,cb) {
            $http({
                url: '/api/trade/'+id,
                method: 'DELETE',
            }).then(function(res) {
                cb(res);
            }, function(err) {
                cb(err);
            });
        }
    }
    
}]);