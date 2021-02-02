(function() {
    angular.module('TaskTimerModule').controller('WelcomePageController',welcomePageController);
    
    function welcomePageController($scope, $location, $rootScope) {
        $scope.tasksDescription=[];
  
        $scope.go = function() {
         
            $rootScope.tasksDes = $scope.tasksDescription;
            $location.path("/tasks");

        }
        
        $scope.addTask = function() {
          
        }

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