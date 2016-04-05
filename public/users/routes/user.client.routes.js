angular.module('users').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'users/views/index.client.view.html',
        controller: 'UserController'
    })
    .when('/signup', {
        templateUrl: 'users/views/signup.client.view.html',
        controller: 'UserController'
    })
    .when('/signin', {
        templateUrl: 'users/views/login.client.view.html',
        controller: 'UserController'
    }).otherwise({redirectTo: '/'});
}]);