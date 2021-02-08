(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope, $rootScope, $interval) {

      $scope.stop= function() {
        alert("stop");
    }
      String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours + ':' + minutes + ':' + seconds;
    }
      $scope.$on('chart-create', function (evt, chart) {
        $scope.myChart =chart;
       });
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

       
        $scope.options = {
          onClick: function(e , item) {
            
            var element = this.getElementAtEvent(e);
           if (element.length) {
               var task = element[0]['_chart'].config.data.labels[element[0]['_index']];
            }
            if ( angular.isDefined(stop) ) return;


            stop = $interval(function() {
              
                $scope.timer[element[0]['_index']] = $scope.timer[element[0]['_index']] + 1;
                /* $scope.myChart.update(0); */
                $scope.timer[3]=$scope.timer[3]+1;
                /* console.log("5700".toHHMMSS()); */
                $scope.options.tooltips.callbacks.label;
               
               
                
            }, 1000);
          },
          tooltips:   
            {
              enabled: true,
              callbacks: {
                label: function(tooltipItem, data) 
                {
                  var label = data.labels[tooltipItem.index];
                  var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  var time =$scope.timer[tooltipItem.index].toString();
                  return label + ': ' /* + datasetLabel */+time.toHHMMSS();
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
      
   
        /* $scope.hoverme = function ($event) {
          alert("You hovered over " + $event[0]._view.label);
        }   */
       
        Chart.pluginService.register({
          beforeRender: function (chart) { 
            if (chart.config.options.showAllTooltips) {
              // create an array of tooltips
              // we can't use the chart tooltip because there is only one tooltip per chart
              chart.pluginTooltips = [];
              chart.config.data.datasets.forEach(function (dataset, i) {
                chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                  chart.pluginTooltips.push(new Chart.Tooltip({
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [sector]
                  }, chart));
            /*       console.log(chart.pluginTooltips[i]['_chart'].config.data.labels)*/
                });
              });
              // turn off normal tooltips
              chart.options.tooltips.enabled = false;
            }
          },
          afterDraw: function (chart, easing) {
            if (chart.config.options.showAllTooltips) {
              // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
              if (!chart.allTooltipsOnce) {
                if (easing !== 1){
                  return;}
                chart.allTooltipsOnce = true;
              }
              // turn on tooltips
              chart.options.tooltips.enabled = true;
              Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                tooltip.initialize();
                tooltip.update();  
                // we don't actually need this since we are not animating tooltips
                tooltip.pivot();
                tooltip.transition(easing).draw();
           
              });
              chart.options.tooltips.enabled = false;
            }
          }
        })
       

      
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