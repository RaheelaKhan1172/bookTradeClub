angular.module('books').controller('BookController',['BookService', '$scope','Authentication', '$window', function(BookService,$scope,Authentication, $window) {
    
    $scope.user = JSON.parse(Authentication.getData());
    console.log($scope.user,'user');
    
    $scope.getBook = function() {
        //this could be accessed from multiple areas
        $scope.book = JSON.parse(BookService.getData());
        console.log('book',$scope.book);
    }
    
    $scope.allBooks = function() {
        $scope.books = BookService.allBooks(function(response) {
            console.log(response);
        });
    }
    
    $scope.deleteBook = function(id) {
        console.log('id', id);
        BookService.delete(id,function(response) {
            $window.alert('deleted book!');
            
            $location.path('/dashboard');
       
        });
    }

}]);