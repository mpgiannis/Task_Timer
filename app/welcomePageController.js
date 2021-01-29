(function() {
    angular.module('TaskTimerModule').controller('WelcomePageController',welcomePageController);
    
    function welcomePageController($scope, $location) {
  
        $scope.go = function() {
           $location.path("/tasks");
        }
        
        $scope.addTask = function() {
          
        }

        var forms = [
            "newRackForm",
          ];
        $scope.displayedForms = [];
        $scope.addForm = function(formIndex) {
            $scope.displayedForms.push(forms[formIndex]);
          }
  

    }
})();