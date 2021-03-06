//note, not utilizing services since requests will be made from this controller only

angular.module('dashboard').controller('DashController', ['$scope', 'Authentication', '$http', 'BookService','$location','RequestService',  function($scope,Authentication,$http, BookService,$location,RequestService) {
    console.log('hi hi hi');
    $scope.user = {};
//    $scope.value = {profile:true,books:false,tradeUser:false,tradeOther:false,add:false};
    $scope.book = {};
    $scope.currValue = 'Books';
    /**
    *
    * Load data on initial page load @return{Object}
    *
    **/
    $scope.isToggled = false;
    
    $scope.toggle = function() {
        return $scope.isToggled=false;
    }
    
    $scope.toggleBack = function() {
        $scope.isToggled = true;
    }
    
    $scope.getData = function() {
        $scope.currentUserBooks = [];
        var d = Authentication.getData();

        d = JSON.parse(d);
        console.log(d,'data');
        Authentication.getUser(d.email,function(response){
            console.log(response);
            if (response.status !== 400 && response.data !== null) {
                $scope.user = response.data
               
                $scope.user.books.filter(function(a) {
                    return $scope.currentUserBooks.push({
                        title: a.title,
                        id: a._id
                    });
                });
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
    * deperecated 
    $scope.toggleClick = function(val) {
        for (prop in $scope.value) {
            if (prop === val.target.value) {
                $scope.value[prop] = true;
            } else {
                $scope.value[prop] = false;
            }
        }
        console.log($scope.value);
    }; */
    
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
    
    var result = function(response) {
        console.log('response?', response);
        if (response.status === 200) {
            console.log('am i happening?');
            handleResponse(response.data);
        } else {
            $scope.error = response.data;
        }
    };
    
    $scope.submit = function() {
        console.log($scope.user,'user');
        if (fileData !== null) {
            fileData.append('author', $scope.book.author);
            fileData.append('title', $scope.book.title);

            console.log(fileData, 'fileData');
            
            BookService.addMultBook(fileData,$scope.user.email, result);
        /*    $http.post('/api/books', fileData,{
                headers: {"Content-Type": undefined , "data": $scope.user.email,"mult":true},
                transformRequest: angular.identity
            }).then(function(respones) {
                handleResponse(response.data);
                console.log(response);
            }, function(error) {
                console.log('error', error);
            }); */
        } else {
            
            BookService.addBook($scope.book,$scope.user.email,result);
         /*   $http({
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
        }; */
        };
    };
    /*********************** END SUBMIT FORM ***************************/
    
    /************************ REMOVE BOOK *****************************/
        $scope.remove = function(id) {
            console.log('id',id);
            BookService.delete(id, function(response) {
                console.log(response.data, response.data._id);
                $scope.currentUserBooks = $scope.currentUserBooks.filter(function(a) {
                    return a.id !== response.data._id;
                });
           });
    
        };
        
        
     /************************ END REMOVE BOOK *****************************/
    
    
    /********************* TRADE REQUESTS **************************************/
    var tradeResult = function(response,id) {
        console.log(response,'res');
        for (var i = 0; i < $scope.user.requestBy.length; i++) {
                if ($scope.user.requestBy[i]._id == id) {
                    $scope.user.requestBy[i].status = response.data.status;
                }
            }
        
        if (response.data.status === "Denied") {
            console.log('hi');
                $scope.user.requestBy = $scope.user.requestBy.filter(function(a,i) {
                    return a._id != id;
                });
                console.log($scope.user,id);
        }
    };
    
    $scope.accept = function(id) {
        console.log('id',id);
        RequestService.accept(id,tradeResult); 
    }
    
    $scope.deny = function(id) {
        console.log('in deny', id);
        RequestService.deny(id,tradeResult);
    };
    
    //also cancel request
    $scope.remove = function(id) {
        console.log('in here',id);
        RequestService.remove(id,function(res) {
            $scope.user.requestMade = $scope.user.requestMade.filter(function(a,i) {
                return a._id != id;
            });
        });
    };
        
    /** Update users city/state ***************************************************/
    $scope.updatedValues = {city:'',state:''};
    
    $scope.update = function() {
        console.log($scope.updatedValues);
        if (!$scope.updatedValues.city) {
            console.log($scope.updatedValues);
            $scope.updatedValues.city = $scope.user.city
        } 
        if (!$scope.updatedValues.state) {
            $scope.updatedValue.state = $scope.user.state
        }
        
        Authentication.updateUser($scope.user._id,$scope.updatedValues,function(res) {
            console.log(res);
        });
    };
    /******************** END UPDATE ******************************/
    
    
    /******************* for active toggling *********************/
    
    
    
}]);