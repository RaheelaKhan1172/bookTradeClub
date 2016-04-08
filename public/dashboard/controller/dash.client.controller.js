angular.module('dashboard').controller('DashController', ['$scope', 'Authentication', function($scope,Authentication) {
    console.log('hi hi hi');
    $scope.user = {};
    
    $scope.getData = function() {
        var d = Authentication.getData();
        d = JSON.parse(d);
       // console.log(d);
    
        Authentication.getUser(d.email,function(response){
            if (response.status !== 400) {
                $scope.user = response.data
            } else {
                $scope.error = response.data;
            }
        });
    };
    

}]);