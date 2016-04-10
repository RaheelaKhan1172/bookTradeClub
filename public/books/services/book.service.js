angular.module('books').factory('BookService', ['$window','$rootScope', function($window,$rootScope) {
    
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
        } 
    
    };
    
}]);