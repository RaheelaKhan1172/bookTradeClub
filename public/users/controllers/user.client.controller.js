angular.module('users').controller('UserController', ['$scope','$http','$location','Authentication',
  function($scope,$http,$location,Authentication) {
      
      $scope.user = {}; //for view
      console.log($scope.user,'hi outside');
      console.log('auth', $scope.authenticated);
      
      var setScope = function(data) {
          if (data !== null) {
              $scope.user = data;
              $scope.authenticated = true;
              console.log(data, typeof data);
              Authentication.setData(JSON.stringify(data));
              console.log(Authentication.getData());
          } else {
              $scope.authenticated = false;
          }
          console.log('new stuff', $scope.user, $scope.authenticated);
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
            setScope(response.data);
            $location.path('/');
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
              setScope(response.data);
              console.log('repsonse',response);
              $location.path('/');
          }, function(error) {
              console.log('error',error);
          });
      }
      
      $scope.signOut = function() {
          $http({
              url:'/signout',
              method:'GET'
          }).then(function(response) {
              console.log('response',response);
              Authentication.removeData();
              console.log(Authentication.getData());
              $scope.authenticated = false;
              $location.path('/');
              
          });
      }
      
       $scope.findData = function() {
           var data = Authentication.getData();
           if (data) {
                $scope.authenticated = true;    
           } else {
               $scope.authenticated = false;
           }
      };
 
  }]);