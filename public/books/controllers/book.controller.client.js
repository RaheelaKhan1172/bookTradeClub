angular.module('books').controller('BookController',['BookService', '$scope','Authentication', '$window','$location', 'RequestService','$timeout', function(BookService,$scope,Authentication, $window,$location,RequestService,$timeout) {
    
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
                console.log($scope.book);
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
        });
        
    };
    
    $scope.deleteBook = function(id) {

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
    $scope.alert = null;
    $scope.trade = function(id) {
        var toSend = {for: id, requestedBy:$scope.user._id}
        RequestService.post(toSend,function(response) {
            console.log(response);
            $scope.alert = response.data.message;
            $timeout(function() {
                $scope.alert = null;
            },5000);
            
        });
    };

}]);