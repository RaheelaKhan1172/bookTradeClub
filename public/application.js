var mainApplicationModuleName = 'bookClub';

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngRoute','ui.bootstrap','users']);

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('!');
    }
]);

angular.element(document).ready(function() {
    angular.bootstrap(document,[mainApplicationModuleName]);
});