angular
    .module('TaskTimerModule', ['ngRoute','chart.js'])
   
    .config(['$routeProvider', function($routeProvider){
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/login.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: 'app/welcomePage.html',
                controller: 'WelcomePageController'
            })
            .when('/tasks', {
                templateUrl: 'app/tasks.html',
                controller: 'TasksController'
            })
            .when('/newPacket', {
                templateUrl: 'app/newPacket.html',
                controller: 'NewPacketController'
            })
            .when('/stats', {
                templateUrl: 'app/stats.html',
                controller: 'StatsController'
            })
           

            .otherwise({redirectTo: '/'});

        
    }]);