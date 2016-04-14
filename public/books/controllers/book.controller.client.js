angular.module('books').controller('BookController',['BookService', '$scope', function(BookService,$scope) {
    
    $scope.getBook = function() {
        $scope.book = JSON.parse(BookService.getData());
        console.log($scope.book);
    }
    
    $scope.allBooks = function() {
        $scope.books = BookService.allBooks(function(response) {
            console.log(response);
        });
    }

}]);