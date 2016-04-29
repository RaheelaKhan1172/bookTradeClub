angular.module('dashboard').directive('windoWidth', ['$window', function($window) {
return {
     link:function($scope, element, attrs){
       
       $scope.width = $window.innerWidth;
       
       angular.element($window).bind('resize', function(){
       
         $scope.width = $window.innerWidth;
    
         $scope.$digest();
       });
       
     }
}
 }]);
 