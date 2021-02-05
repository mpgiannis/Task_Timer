(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope, $rootScope, $interval) {
        $scope.timer=[0,0,0,0];  
        var stop;
        $scope.pinakas=["Men", "Women", "Unknown"];
        $scope.labels = [];
        $scope.data = [];
       
        $scope.value = $rootScope.tasksDes;
        console.log($scope.value.length);
        for (var i=0; i<$scope.value.length; i++){
        $scope.labels.push($scope.value[i]);
        $scope.data.push(1);
        }

     /*    $scope.PieDataSetOverride = [{ yAxisID: 'y-axis-1' }]; */

        $scope
        $scope.options = {
          onClick: function(e , item) {
           /*  console.log(e);*/
            /* console.log(this.chart.canvas); */
            
            var element = this.getElementAtEvent(e);
           /*  console.log(element); */
           if (element.length) {
              /*  console.log(element[0]['_chart'].config.data)
               console.log(element[0])
               console.log(element[0]['_index']) */
               var task = element[0]['_chart'].config.data.labels[element[0]['_index']];
              /*  console.log(task) */
            }
            if ( angular.isDefined(stop) ) return;


            stop = $interval(function() {
              
              /* console.log(this.pluginTooltips[0]) */
                $scope.timer[element[0]['_index']] = $scope.timer[element[0]['_index']] + 1;
               
               
                
            }, 1000);
          },
          tooltips:   
            {
              enabled: true,
              callbacks: {
                label: function(tooltipItem, data) {
                  /* console.log(tooltipItem) */
                  var label = data.labels[tooltipItem.index];
                  var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  return label + ': ' /* + datasetLabel */+$scope.timer[tooltipItem.index];
                }
              }
             
            },
          animation:
            {   
            onComplete: function(animation)
                {
                  /* this.options.animation.onComplete = null; */
                 /*  console.log(this); */
                 /*  this.showTooltip(this.segments, true); */
                  /* alert("a"); */
                }
            },
          tooltipEvents: [],
          showTooltips: true,
          showAllTooltips: true,
          legend: { display: true },
          responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
         
        }
   /*      $scope.clickme = function($event){
        
          if ( angular.isDefined(stop) ) return;


          stop = $interval(function() {
            
              
              $scope.timer = $scope.timer + 1;
              
              
          }, 1000);
          
        } */
        $scope.DataSetOverride = {
          backgroundColor: ['#383a4e', '#A04d4d', '#ff8c00', '#413041', '#7b6888', '#6b486b', '#d68c5b', '#d0743c'],
          hoverBackgroundColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
          hoverBorderColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
          hoverBorderWidth:[8],
          hoverRadius:[4,4,4,4,4,4,4,4],
          
        
        };
       /*  $scope.$on('chart-create', function (evt, chart) {
          console.log(chart);
        }); */
   
        /* $scope.hoverme = function ($event) {
          alert("You hovered over " + $event[0]._view.label);
        }   */
       

      
       /*  console.log($scope.data); */
        /* function addCommas(nStr)
        {
           nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        } */
     

  

    }
})();