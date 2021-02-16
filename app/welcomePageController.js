(function() {
    angular.module('TaskTimerModule').controller('WelcomePageController',welcomePageController);
    
    function welcomePageController($scope, $location, $http, $routeParams, $rootScope) {

        $scope.user=$rootScope.user[0].name;
        /* $scope.user=$routeParams.user[0].name; */
        /* $rootScope.userId =$routeParams.user[0].id; */
        $http({
            method: 'get',
            url: './php/getPackets.php',
            params:{userId: $rootScope.user[0].id}
           }).then(function successCallback(response) {
                console.log(response)
                $scope.packets = response.data;
           });

        $scope.go = function() {
            $location.path("/tasks").search({packet: $scope.packetId});
        }
        $scope.newPacket = function () { 
          $location.path("/newPacket")
        };

    }
})();