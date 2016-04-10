angular.module('books').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/books/:id', {
        templateUrl: 'books/views/view-book.html'
    });
}]);