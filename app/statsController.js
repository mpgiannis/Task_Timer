(function() {
    angular.module('TaskTimerModule').controller('StatsController',statsController);
    
    function statsController($scope, $http, $routeParams, $rootScope) {
        $scope.labels = [];
        $scope.data = [];
        $scope.packetId = $routeParams.packet;
        init($scope.packetId);
        function init(a){
        $http({
            method: 'get',
            url: './php/getAlltimes.php',
            params:{packet: a}
           }).then(function successCallback(response) {
            $scope.times = response.data;
            for (var i=0; i<$scope.times.length; i++){
                $scope.labels.push($scope.times[i].name);
                $scope.data.push($scope.times[i].time);
                }

           });
        }
        $scope.DataSetOverride = {
            backgroundColor: ['#383a4e', '#A04d4d', '#ff8c00', '#413041', '#7b6888', '#6b486b', '#d68c5b', '#d0743c'],
            hoverBackgroundColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
            hoverBorderColor: ['#22243a', '#822e2e', '#c66d00', '#2d1a2d', '#634d72', '#533253', '#B66734', '#AF561E'],
          /*   hoverBorderWidth:[8,8,8,8,8,8,8,8], */
       /*      hoverRadius:[4,4,4,4,4,4,4,4] */
          };
        $http({
            method: 'get',
            url: './php/getPackets.php',
            params:/* {userId: $rootScope.user[0].id} */{userUuid: localStorage.getItem('uuid')}
        }).then(function successCallback(response) {
            $scope.packets = response.data;
            });
            $scope.update = function(id){
            $scope.labels = [];
            $scope.data = [];
            init(id);        
        }
        $scope.options = {
            /*tooltips:   
            {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) 
                {
                var label = data.labels[tooltipItem.index];
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                var time =$scope.timer[tooltipItem.index].toString();
                return label + ': ' + datasetLabel+time.toHHMMSS();
                }

            }
            }, */
            maintainAspectRatio: false,
            showAllTooltips: true,
            legend: { display: true },
        }
        
        Chart.pluginService.register({
            beforeRender: function (chart) { 
                if (chart.config.options.showAllTooltips) {
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
                chart.options.tooltips.enabled = false;
                }
            },
            afterDraw: function (chart, easing) {
                if (chart.config.options.showAllTooltips) {
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1){
                    return;}
                    chart.allTooltipsOnce = true;
                }
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                    tooltip.initialize();
                    tooltip.update();  
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
                }
            }
            })
        
       

    }
})();