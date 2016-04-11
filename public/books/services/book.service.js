angular.module('books').factory('BookService', ['$window','$rootScope','$http', function($window,$rootScope,$http) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'book') {
            $rootScope.$apply();
        }
    });
    
    return {
        setData: function(value) {
            $window.sessionStorage && $window.sessionStorage.setItem('book', value);
            return this;
        },
    
        getData: function() {
            return $window.sessionStorage && $window.sessionStorage.getItem('book');
        },
        
        addMultBook: function(data,email,cb) {
            $http.post('/api/books', data, {
                headers: {"Content-Type":undefined, "data":email, "mult":true},
                transformRequest: angular.identity
            }).then(function(response) {
                cb(response);
            }, function(error) {
                cb(error);
            });
        },
    
        addBook: function(data,email,cb) {
            $http({
                url: '/api/books',
                method: 'POST',
                headers: {"data": email, "mult":false},
                data:data
            }).then(function(response) {
                cb(response);
            }, function(error) {
                cb(error);
            });
        },
        delete: function(id,cb) {
            $http({
                url:'/api/books/'+id,
                method: 'DELETE',

            }).then(function(response) {
                cb(response);
            }, function(error) {
                cb(error);
            });
        }
    };
    
}]);