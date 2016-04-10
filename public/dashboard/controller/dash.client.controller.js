//note, not utilizing services since requests will be made from this controller only

angular.module('dashboard').controller('DashController', ['$scope', 'Authentication', '$http', 'BookService','$location',  function($scope,Authentication,$http, BookService,$location) {
    console.log('hi hi hi');
    $scope.user = {};
    $scope.value = {books:false,tradeUser:false,tradeOther:false,add:false};
    $scope.book = {};
    /**
    *
    * Load data on initial page load @return{Object}
    *
    **/
    $scope.getData = function() {
        console.log('hi, here ho');
    
        var d = Authentication.getData();

        d = JSON.parse(d);
    
        Authentication.getUser(d.email,function(response){
            console.log(response);
            if (response.status !== 400 && response.data !== null) {
                $scope.user = response.data
                console.log($scope.user,'user');
            } else {
                $scope.error = response.data;
            }
        });
    };
    
    /**
    **
    * Toggle clicks for display
    **
    */
    $scope.toggleClick = function(val) {
        for (prop in $scope.value) {
            if (prop === val.target.value) {
                $scope.value[prop] = true;
            } else {
                $scope.value[prop] = false;
            }
        }
    };
    
    /************************************* SUBMIT FORM **************************************/
    
    var fileData = null;
    var handleResponse = function(response) {
        BookService.setData(JSON.stringify(response));
        $location.path('/books/' + response._id);
    };
    
    /**
    **
    * Submit form to server @return{Object} 
    **/
    
    $scope.uploadFile = function(files) {
      fileData = new FormData();  
        
      fileData.append("file", files[0]);
        console.log(files,files[0],fileData,'fileDAta');
        $scope.book.image = fileData;
    };
    
    /**
    *
    **  send either mulipart/form or regular form request to server
    **/
    $scope.submit = function() {
        console.log($scope.user,'user');
        if (fileData !== null) {
            fileData.append('author', $scope.book.author);
            fileData.append('title', $scope.book.title);

            console.log(fileData, 'fileData');
            $http.post('/api/books', fileData,{
                headers: {"Content-Type": undefined , "data": $scope.user.email,"mult":true},
                transformRequest: angular.identity
            }).then(function(respones) {
                handleResponse(response.data);
                console.log(response);
            }, function(error) {
                console.log('error', error);
            });
        } else {
            $http({
                url:'/api/books',
                method:'POST',
                headers: {"data": $scope.user.email,"mult":false},
                data: $scope.book
            }).then(function(response) {
                handleResponse(response.data);
                console.log('reg response', response);
            },function(error) {
                console.log('error in reg response', error);
            });
        };
    };
    
    /*********************** END SUBMIT FORM ***************************/
    
    
    /************************* GET CURRENT USERS BOOKS **********************/
        
    

}]);