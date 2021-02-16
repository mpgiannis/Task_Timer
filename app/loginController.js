(function() {
    angular.module('TaskTimerModule').controller('LoginController',loginController);
    
    function loginController($scope, $location, $http, $rootScope) {
    
        $scope.go = function() {
            $http({
                method:"GET",
                url:"./php/getUsers.php", 
                params: { "name": $scope.username, 
                          "password":  $scope.password
                      }   
            }).then(function successCallback(data){
                if(data.data==0){
                    alert("user not found")
                }
                else{
                    $rootScope.user=data.data;
                    console.log($rootScope.user)
                    localStorage.setItem("name", "giannis");
                    $location.path("/home");/* .search({user: data.data}); */
                   
                }
            });
        }

    }
})();