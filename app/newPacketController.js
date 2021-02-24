(function() {
    angular.module('TaskTimerModule').controller('NewPacketController',newPacketController);
    
    function newPacketController($scope, $location, $http, $rootScope) {

        
        $scope.tasks=[];
        $scope.userName=localStorage.getItem('name');
     /*    $scope.go=function(){
            console.log($scope.selectedItem)
            console.log($scope.tasksDescription)
        } */
        $scope.go = function() {
            if($scope.tasks.length>0){
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
                                "names": $scope.tasks 
                            }   
                    }).then(function successCallback(data){
                    console.log(data);
                    $location.path("/tasks").search({packet: $scope.packetId});
                
                    });
            
                });
            }
            else{
                alert("Give Tasks")
            }
        }
        $scope.saveTask = function(){
            if(!$scope.tasksDescription){
                alert("Give Task")
            }
            else{
                if($scope.tasks.length<10){
                    $scope.tasks.push($scope.tasksDescription);
                    $scope.tasksDescription="";
                }
                else{
                    alert("10 Tasks max")
                }
            }
        }
        $scope.delete= function(e,x){
            e.preventDefault();
            $scope.tasks.splice(x,1);

        }

    }
})();