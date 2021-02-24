(function() {
    angular.module('TaskTimerModule').controller('LoginController',loginController);
    function loginController($scope, $location, $http, $rootScope, $timeout) {
        $scope.go = function() {
            /* if(angular.isDefined($rootScope.user))
            {
                alert("You already login with "+$rootScope.user[0].name);
                $location.path("/home");
            }
            else
            { */
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
                        $('form').fadeOut(500);
                        $('.wrapper').addClass('form-success');
                        /* $rootScope.user=data.data; */
                        for (var i=0; i<data.data.length; i++){
                        localStorage.setItem("uuid", data.data[i].uuid);
                        localStorage.setItem("name", data.data[i].name);
                        localStorage.setItem("email", data.data[i].email);
                        }
                        /* localStorage.setItem("name", $rootScope.user[0].name); */
                        /* $location.path("/home").search({user: data.data});   */ 
                        $timeout(function () {
                            $location.path("/home");
                        }, 2000);
                    }
                });
           /*  } */
        }
    
        $scope.signUp = function() {
                $location.path("/signUp");
        }
        
    }
})();