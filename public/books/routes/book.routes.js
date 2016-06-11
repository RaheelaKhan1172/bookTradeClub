angular.module('books').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/books/:id', {
        templateUrl: 'books/views/view-book.html',
        authenticate:true
    })
    .when('/books', {
        templateUrl: 'books/views/all-books.html',
        authenticate:true
    })
    .otherwise({redirectTo: 'books/views/all-books.html'});
}]);
