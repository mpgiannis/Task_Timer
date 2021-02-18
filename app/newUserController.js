(function() {
    angular.module('TaskTimerModule').controller('NewUserController',newUserController);
    
    function newUserController($scope, $location, $http, $rootScope) {

        
        $scope.go = function() {
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
                });
            }
            var uuid =uuidv4();

            $http({
                method:"POST",
                url:"./php/insert_user.php", 
                data: { "name": $scope.userName ,
                        "pass": $scope.userPass ,
                        "email": $scope.userEmail,
                        "uuid": uuid
                      }   
            }).then(function successCallback(data){
                console.log(data.data)
                $location.path("/");
          
            });
        }


    }
})();