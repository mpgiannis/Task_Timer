(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope, $rootScope, $interval) {
        $scope.timer=0;
        var stop;
        $scope.labels = [];
        $scope.data = [];
       
        $scope.value = $rootScope.tasksDes;
        console.log($scope.value.length);
        for (var i=0; i<$scope.value.length; i++){
        $scope.labels.push($scope.value[i]);
        $scope.data.push(1);
        }
        /* $scope.colors= ['#90EE90', '#ee9690', '#caee90', '#a190ee','#ee90ca']; */
        $scope.PieDataSetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
         /*  onClick: function(e)
          {
            var activePoints = doughnut.getElementsAtEvent(e);
            var selectedIndex=activePoints[0]._index;
            alert(this.data.datasets[0].data[selectedIndex]);
            alert("You've clicked upon "+$event[0]._view.label);
            if ( angular.isDefined(stop) ) return;
            stop = $interval(function() {
          
              $scope.timer = $scope.timer + 1;
              
          }, 1000);
          }, */
          /* animationDuration:2000, */
          tooltips: {enabled: false},
          animation: {
            onComplete: function () {
              /* this.showTooltip(this.segments, true); */
             /*  alert("You hovered over "); */
            }

          },
      
          legend: { display: false },
          responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
          /* scales: {
              yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }]
          } */
        }
        $scope.clickme = function($event){
          console.log($event);
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
          
              $scope.timer = $scope.timer + 1;
              
          }, 1000);
          
        }
        $scope.DataSetOverride = {
          backgroundColor: ['#383a4e', '#A04d4d', '#ff8c00', '#413041', '#7b6888', '#6b486b', '#d68c5b', '#d0743c'],
          hoverBackgroundColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
          hoverBorderColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
          hoverBorderWidth:[8],
          hoverRadius:[4,4,4,4,4,4,4,4],
          
        
        };
   
        /* $scope.hoverme = function ($event) {
          alert("You hovered over " + $event[0]._view.label);
        }   */

  

    }
})();