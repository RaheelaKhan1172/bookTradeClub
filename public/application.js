//'main' module

var mainApplicationModuleName = 'bookClub';

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngRoute','ui.bootstrap','users','dashboard','books','request']);

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
    
    
    //401s and redirects --add function
  
  
}]);

//auth only views
mainApplicationModule.run(['$rootScope','$location', 'Authentication', function($rootScope,$location,Authentication) {
    
    $rootScope.$on('$routeChangeStart', function(event,next) {
        if (next.authenticate) {
            if (!Authentication.loggedIn()) {
                $location.path('/signin')
            }
        }
    });
}]);

angular.element(document).ready(function() {
    angular.bootstrap(document,[mainApplicationModuleName]);
    
});