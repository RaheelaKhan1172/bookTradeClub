angular.module('users').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'users/views/index.client.view.html',
        change:true,
        controller: 'UserController'
    })
    .when('/signup', {
        templateUrl: 'users/views/signup.client.view.html',
        change:true,
        controller: 'UserController'
    })
    .when('/signin', {
        templateUrl: 'users/views/login.client.view.html',
        change:true,
        controller: 'UserController'
    }).otherwise({redirectTo: '/'});
}]);