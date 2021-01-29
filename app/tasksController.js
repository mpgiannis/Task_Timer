(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope, mySerivce) {

        $scope.labels = ["TASK-1", "TASK-2", "TASK-3"];
        $scope.data = [2 , 2, 1];

        $scope.tasks=mySerivce.getData();
        


       
    
    
  

    }
})();