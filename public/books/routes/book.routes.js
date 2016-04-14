angular.module('books').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/books/:id', {
        templateUrl: 'books/views/view-book.html'
    })
    .when('/books', {
        templateUrl: 'books/views/all-books.html'
    })
    .otherwise({redirectTo: 'books/views/all-books.html'});
}]);