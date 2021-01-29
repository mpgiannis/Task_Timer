angular
    .module('TaskTimerModule', ['ngRoute','chart.js'])
   
    .config(['$routeProvider', function($routeProvider){
        
        $routeProvider
            .when('/', {
                templateUrl: 'app/welcomePage.html',
                controller: 'WelcomePageController'
            })
            .when('/tasks', {
                templateUrl: 'app/tasks.html',
                controller: 'TasksController'
            })
            .otherwise({redirectTo: '/'});
    }]);