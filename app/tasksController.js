(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);

    angular.module('TaskTimerModule').filter('secondsToDateTime', [function() {
      return function(seconds) {
          return new Date(1970, 0, 1).setSeconds(seconds);
      };
      }])
    
    function tasksController($scope, $interval, $http, $routeParams, $location) {

      $scope.labels = [];
      $scope.data = [];
      $scope.timer=[];

      $scope.packetId =$routeParams.packet;
      if(angular.isDefined($scope.packetId)){
        $http({
          method: 'get',
          url: "./php/getTasks.php",
          params:{packet: $scope.packetId}
         }).then(function successCallback(response) {
          // Store response data
          $scope.pinakas = response.data;
          console.log($scope.pinakas)
          for (var i=0; i<$scope.pinakas.length; i++){
            $scope.labels.push($scope.pinakas[i].name);
            $scope.data.push(1);
            $scope.timer.push(0);
            }
         });
      } 
      
      $scope.$on('chart-create', function (evt, chart) {
        $scope.myChart =chart;
      });
    
      var runningTaskName="";
      var runningTask=false;
      $scope.intervalTimer;
      $scope.globalTimer=0;
      $scope.save= function() {
        $http({
                method:"POST",
                url:"./php/insert_times.php", 
                data: { 
                        "packetId": $scope.packetId,
                        "tasks": $scope.pinakas,
                        "time": $scope.timer 
                      }   
                  
        }).then(function successCallback(data){
            console.log(data.data);
          
        });
      }
      $scope.stats= function() {
        $location.path("/stats").search({packet: $scope.packetId});
      }
      function StopFunction(myVar) {
        $interval.cancel(myVar);
      }
      function StartFunction(index){
        $scope.intervalTimer = $interval(function() {
          $scope.timer[index] = $scope.timer[index] + 1;
          $scope.myChart.update();
          $scope.globalTimer=$scope.globalTimer+1;
        }, 1000);
      }
      $scope.options = {
        onClick: function(e , item) {

          var element = this.getElementAtEvent(e);
          if (element.length) {
            var clikedTask = element[0]['_chart'].config.data.labels[element[0]['_index']];
            if(clikedTask!=runningTaskName){
              StopFunction($scope.intervalTimer);
              StartFunction(element[0]['_index']);
              runningTaskName = clikedTask;
              runningTask=true;
            }
            else if(clikedTask==runningTaskName){
              if(runningTask){ 
                StopFunction($scope.intervalTimer);
                runningTask=false;}
              else{
                StartFunction(element[0]['_index']);
                runningTask=true;}
            }
          }

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
  
      $scope.DataSetOverride = {
        backgroundColor: ['#383a4e', '#A04d4d', '#ff8c00', '#413041', '#7b6888', '#6b486b', '#d68c5b', '#d0743c'],
        hoverBackgroundColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
        hoverBorderColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
        hoverBorderWidth:[8,8,8,8,8,8,8,8,8],
        /* hoverRadius:[4,4,4,4,4,4,4,4]  */
      };
      
   
        /* $scope.hoverme = function ($event) {
          alert("You hovered over " + $event[0]._view.label);
        }   */
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
       

    }
})();