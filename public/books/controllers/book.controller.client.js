angular.module('books').controller('BookController',['BookService', '$scope','Authentication', '$window','$location', function(BookService,$scope,Authentication, $window,$location) {
    
    $scope.user = JSON.parse(Authentication.getData());
    console.log($scope.user,'user');
    
    $scope.getBook = function() {
        //this could be accessed from multiple areas, remember to change it to make it viewable for all books not even in sessionStorage;
        
        console.log($location.absUrl());
        var toSend = $location.absUrl().slice($location.absUrl().lastIndexOf('/')+1);
        console.log(toSend);
        BookService.getBook(toSend, function(response) {
            if (response.data && response.status === 200) {
                $scope.book = response.data
            } 
        });
  //      console.log('book',$scope.book);
    };
    /**
    **
    ** get all books @return [Array of {Objects}]
    **
    **/
    
    $scope.allBooks = function() {
        BookService.allBooks(function(response) {
            if (response.data && response.status === 200) {
                $scope.books = response.data;
            }
            console.log($scope.books,' all books')
        });
        
    };
    
    $scope.deleteBook = function(id) {
        console.log('id', id);
        BookService.delete(id,function(response) {
            $window.alert('deleted book!');
            
            $location.path('/dashboard');
       
        });
    }
    
    /**
    **
    ** @return {Object}
    **
    **/
    
    $scope.trade = function(id) {
        console.log('id',id);
        
    }

}]);