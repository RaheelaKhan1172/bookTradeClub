angular.module('dashboard').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl:'dashboard/views/dash.client.view.html',
        authenticate: true
    });
    
}])