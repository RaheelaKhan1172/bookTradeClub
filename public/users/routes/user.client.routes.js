angular.module('users').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signup', {
        templateUrl: 'users/views/signup.client.view.html'
    })
    .when('/signin', {
        templateUrl: 'users/views/login.client.view.html'
    }).otherwise({redirectTo: '/'});
}]);