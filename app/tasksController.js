(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope) {

        $scope.labels = ["TASK-1", "TASK-2", "TASK-3"];
        $scope.data = [300, 500, 100];
  
    
  

    }
})();