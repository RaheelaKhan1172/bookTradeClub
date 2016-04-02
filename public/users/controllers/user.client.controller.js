angular.module('users').controller('UserController', ['$scope','$http','$location',
  function($scope,$http,$location) {
      $scope.authenticated = false;
 
      $scope.user = {};
      $scope.checkAuth = function() {
          if ($scope.user.length) {
              $scope.authenticated = true;
              $location.path('/');
          }
      }
      
      $scope.login = function() {
        var send = {
            username: $scope.username,
            password: $scope.password
        };
        $http({
            url:'/signin',
            method: 'POST',
            data: send,
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(response) {
          console.log('response',response);  
        }, function(error) {
            $scope.error = "Hmm, couldn't find that password/email combination. Try again!"
        });
      }
      
      $scope.signup = function() {
          $http({
              url: '/signup',
              method: 'POST',
              data: $scope.user,
              headers: {"Content-Type": "application/json;charset=utf-8"}
          }).then(function(response) {
              console.log('repsonse',response);
          }, function(error) {
              console.log('error',error);
          })
      }
  }]);