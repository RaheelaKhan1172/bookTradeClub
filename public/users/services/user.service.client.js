angular.module('users').factory("Authentication",['$window','$rootScope', '$http', function($window,$rootScope,$http) {
    angular.element($window).on('storage', function(event) {
            if (event.key === 'my-storage') {
                $rootScope.$apply();
            }
    });
    //auth object to enable usage of methods inside service
    var Authentication =  {
        
        /*
        *
        * sets user into local storage
        *
        * */
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        
        /** 
        *
        * retrieve user from storage
        *
        **/
        getData: function() {
            return $window.localStorage && $window.localStorage.getItem('my-storage');
        },
        /**
        *
        * when user logs out, remove user from storage
        *
        **/
        removeData: function() {
            return $window.localStorage && $window.localStorage.clear();
        },
        
        /**
        *
        * retrieve users stuff
        *
        **/
        
        getUser: function(user,cb) {
            $http({
                url: '/api/user',
                method: 'GET',
                headers: {"Content-Type": "application/json;charset=utf-8", "data": user}
            }).then(function(response){
                Authentication.setData(JSON.stringify(response.data));
                cb(response);
            }, function(error) {
                cb(error);
            });
        },
        
        
        /**
        *
        * for auth purposes, checks whether user is logged in
        **/
        
        loggedIn: function() {
            console.log($window.localStorage, $window.localStorage.length)
            if ($window.localStorage.length) {
                return true;
            }  else {
                return false;
            };
        },
        
        /**
        *
        * @return { Object } 
        *
        **/
        
        signin: function(send,cb) {
            $http({
                url: '/signin',
                method: 'POST',
                data: send,
                headers: {"Content-Type": "application/json; charset=utf-8"}
            }).then(function(response){
                Authentication.setData(JSON.stringify(response.data));
                cb(response);
            }, function(error) {
                cb(error);
            });
        },
        /**
        *
        ** @return {Object }
        *
        **/
        signup: function(send,cb) {
            $http({
                url: '/signup',
                method: 'POST',
                data:send,
                headers: {"Content-Type": "application/json; charset=utf-8"}
            }).then(function(response) {
                console.log('hi', response)
                Authentication.setData(JSON.stringify(response.data));
                cb(response);
            }, function(error) {
                cb(error);
            });
        },
        
        /**
        *
        ** signout
        **
        */
        signout: function(cb) {
            $http({
                url: '/signout',
                method: 'GET'
            }).then(function(response) {
                Authentication.removeData();
                cb();
            }, function(error) {
                 cb(error);
            });
        },
        
        /**
        **
        **@update
        **
        **/
        updateUser: function(id,data,cb) {
            console.log('id', id);
            $http({
                url: '/api/user/'+id,
                method: 'PUT',
                data:data
            }).then(function(res) {
                cb(res);
            },function(error) {
                cb(error);
            });
        }
    }
    
    return Authentication;
}]);