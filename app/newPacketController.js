(function() {
    angular.module('TaskTimerModule').controller('NewPacketController',newPacketController);
    
    function newPacketController($scope, $location, $http, $rootScope) {

        $scope.userName=localStorage.getItem('name');
        $scope.go = function() {
            $http({
                method:"POST",
                url:"./php/insert_packet.php", 
                data: { "name": $scope.packetName ,
                        "userUuid": /* $rootScope.userId */localStorage.getItem('uuid')
                      }   
            }).then(function successCallback(data){
                $scope.packetId=data.data;
                $http({
                    method:"POST",
                    url:"./php/insert_tasks.php", 
                    data: {  
                            "packetId": $scope.packetId,
                            "names": $scope.tasksDescription 
                          }   
                }).then(function successCallback(data){
                   console.log(data);
                   $location.path("/tasks").search({packet: $scope.packetId});
              
                });
          
            });
        }

        $scope.packet={};
        $scope.tasksDescription=[];
        var forms = [
            "newTaskForm",
        ];
        $scope.displayedForms = [];
        $scope.addForm = function(formIndex) {
            $scope.displayedForms.push(forms[formIndex]);
        }
        $scope.Delete = function ($index) { 
            $scope.tasksDescription.splice($index, 1);
            $scope.displayedForms.splice($index, 1);
        };

    }
})();