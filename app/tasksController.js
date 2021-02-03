(function() {
    angular.module('TaskTimerModule').controller('TasksController',tasksController);
    
    function tasksController($scope, $rootScope, $interval) {
         var labela = {value: 55, label: "8/18 - 8/24", datasetLabel: "Foo", 
         strokeColor: "rgba(178,145,47,1)", fillColor: "rgba(178,145,47,0.2)"}
        $scope.timer=0;
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
        $scope.PieDataSetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
          tooltips:   
            {
              enabled: true,
              custom: (tooltipModel) => {
                console.log(tooltipModel)
                /* const title = this.myService.getTitle();  */
                  // Tooltip Element
                  var tooltipEl = document.getElementById('chartjs-tooltip');
      
                  // Create element on first render
                  if (!tooltipEl) {
                      tooltipEl = document.createElement('div');
                      tooltipEl.id = 'chartjs-tooltip';
                      tooltipEl.innerHTML = '<table class="myclass">Title ' + "giannis" + '</table>';
                      document.body.appendChild(tooltipEl);
                  }
      
                  // Hide if no tooltip
                  if (tooltipModel.opacity === 0) {
                      tooltipEl.style.opacity = '0';
                      return;
                  }
      
                  // Set caret Position
                  tooltipEl.classList.remove('above', 'below', 'no-transform');
                  if (tooltipModel.yAlign) {
                      tooltipEl.classList.add(tooltipModel.yAlign);
                  } else {
                      tooltipEl.classList.add('no-transform');
                  }
      
                  function getBody(bodyItem) {
                      return bodyItem.lines;
                  }
      
                  // Set Text
                  if (tooltipModel.body) {
                      var titleLines = tooltipModel.title || [];
                      var bodyLines = tooltipModel.body.map(getBody);
                      // console.log("tooltipModel", tooltipModel.body)
                      var innerHtml = '<thead>';
      
                      titleLines.forEach(function(title) {
                          innerHtml += '<tr><th>' + title + ' ToTo</th></tr>';
                      });
      
                      innerHtml += '</thead><tbody>';
                      // console.log(bodyLines)
                      bodyLines.forEach(function(body, i) {
                          var colors = tooltipModel.labelColors[i];
                          var style = 'background:' /* + colors.backgroundColor */;
                          style += '; border-color:' /* + colors.borderColor */;
                          style += '; background-color: red';
                          style += '; border-width: 10px';
                          var span = '<span style="' + style + '"></span>';
                          innerHtml += '<tr><td>' + span + body + '</td></tr>';
                        /*   console.log(body) */
                      });
                      innerHtml += '</tbody>';
      
                      var tableRoot = tooltipEl.querySelector('table');
                      tableRoot.innerHTML = innerHtml;
                      // console.log(tableRoot)
                  }
      
                  // `this` will be the overall tooltip
                  var position = this._chart.canvas.getBoundingClientRect();
      
                  // Display, position, and set styles for font
                  tooltipEl.style.opacity = '1';
                  tooltipEl.style.position = 'absolute';
                  tooltipEl.style.backgroundColor = 'white'
                  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                  tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                  tooltipEl.style.pointerEvents = 'none';
                },
            
              callbacks: {
                label: function(tooltipItem, data) {
                  var label = data.labels[tooltipItem.index];
                  var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  return label + ': ' + datasetLabel;
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
        $scope.clickme = function($event){
          /* console.log("a"); */
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
       /*  $scope.$on('chart-create', function (evt, chart) {
          console.log(chart);
        }); */
   
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
                if (easing !== 1)
                  return;
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
        function addCommas(nStr)
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
        }

  

    }
})();