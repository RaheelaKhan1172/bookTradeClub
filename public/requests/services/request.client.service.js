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
        }
    }
    
}]);