angular.module('users').controller('UserController', ['$scope','$http','$location','Authentication',
  function($scope,$http,$location,Authentication) {
      
      $scope.user = {}; //for view
      $scope.userLogin = {};
     
      
      var setScope = function(data) {
      //    if (data !== null) {
              $scope.user = data;
              $scope.authenticated = true;
              $location.path('/dashboard');
        //      console.log(data, typeof data,$scope.user);
          //    Authentication.setData(JSON.stringify(data));
            //  console.log(Authentication.getData());
        //  } else {
          //    $scope.authenticated = false;
        //  }
          console.log('new stuff', $scope.user, $scope.authenticated);
      };
      
      $scope.login = function() {
        var send = {
            username: $scope.userLogin.username.toUpperCase(),
            password: $scope.userLogin.password
        };
        console.log('tosend', send);
        Authentication.signin(send,function(response) {
            if (response.status !== 400 && response.status !== 401) {
                console.log('in here?');
                setScope(response.data);
            } else {
                $scope.error = "Hm, couldn't find that password/email combination. Try again!"
            }
        });
          
       /* $http({
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
        }); */
      };
      
      
      $scope.signup = function() {
          
         Authentication.signup($scope.user,function(res) {
             if (res.status !== 400) {
                 console.log(res);
                 setScope(res.data);
             } else {
                 $scope.error = res.data;
             }
         }); 
          
          
         /* $http({
              url: '/signup',
              method: 'POST',
              data: $scope.user,
              headers: {"Content-Type": "application/json;charset=utf-8"}
          }).then(function(response) {
              setScope(response.data);
              console.log('repsonse',response);

          }, function(error) {
              console.log('error',error);
          }); */
      };
      
      $scope.signOut = function() {
          
          
          Authentication.signout(function() {
              $scope.authenticated = false;
              $location.path('/');
          });
          
         /* $http({
              url:'/signout',
              method:'GET'
          }).then(function(response) {
              console.log('response',response);
              Authentication.removeData();
              console.log(Authentication.getData());
              $scope.authenticated = false;
              $location.path('/');
              
          }); */
      };
      
       $scope.findData = function() {
           console.log('helloooo');
           var data = Authentication.getData();
           if (data) {
                $scope.user = JSON.parse(data);
                $scope.authenticated = true;   
               $location.path('/dashboard');
           } else {
               $scope.authenticated = false;
           }
      };
          
      
   
      /* move into dashboard **/

 
  }]);