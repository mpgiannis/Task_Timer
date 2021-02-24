(function() {
    angular.module('TaskTimerModule').controller('WelcomePageController',welcomePageController);
    
    function welcomePageController($scope, $location, $http, $mdDialog,$rootScope) {

      $scope.user=localStorage.getItem('name');
      $http({
          method: 'get',
          url: './php/getPackets.php',
          params:{userUuid: localStorage.getItem('uuid')}
          }).then(function successCallback(response) {
              $scope.packets = response.data;
          });

      $scope.go = function() {
          $location.path("/tasks").search({packet: $scope.packetId});
      }
      $scope.newPacket = function () { 
        $location.path("/newPacket")
      };
      $scope.logOut = function () { 
          localStorage.removeItem('name');
          localStorage.removeItem('uuid');
          localStorage.removeItem('email');
          $location.path("/")
      };

      $scope.showAdvanced = function (ev) {
          $http({
              method: 'get',
              url: './php/getTasks.php',
              params:{packet: $scope.packetId}
              }).then(function successCallback(response) {
                  $rootScope.number=response.data.length;
                  $mdDialog.show({
                      controller: DialogController,
                      templateUrl: 'dialog.html',
                      // Appending dialog to document.body to cover sidenav in docs app
                      // Modal dialogs should fully cover application to prevent interaction outside of dialog
                      parent: angular.element(document.body),
                      /* onComplete: afterShow($rootScope.number), */
                      targetEvent: ev,
                      clickOutsideToClose: true,
                      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                  }).then(function (answer) {
                      $scope.status = 'You said the information was "' + answer + '".';
                      console.log($scope.status)
                      $location.path("/tasks").search({packet: $scope.packetId});
                  }, function () {
                      $scope.status = 'You cancelled the dialog.';
                      console.log($scope.status)
                  });
                  });
  
      };

      function DialogController($scope, $mdDialog, $rootScope) {
     
        $scope.number=$rootScope.number;
        $scope.pinakas=[false,false,false,false,false,false,false,false,false,false,];
        $scope.test=[];
        $scope.colors=['#383a4e', '#A04d4d','#d68c5b', '#413041', '#7b6888', '#598f29', '#ff8c00', '#d0743c','#672d73','#d03c3c'];
        /*   $scope.hide = function () {
        $mdDialog.hide();
        }; */

        /* $scope.cancel = function () {
        $mdDialog.cancel();
        }; */
        $scope.answer = function (answer) {
          if(answer){$rootScope.colors=$scope.pinakas}
          $mdDialog.hide(answer);
        };

        $scope.myStyle=function(a) {
            let styles = {
              'background-color': a,
            };
            return styles;
          }
       
        $scope.select=function(a) {
          if(!($('#checkbox_'+[a]).is(":checked"))){
            $scope.pinakas[a]=!$scope.pinakas[a];
            for (i=0; i<$scope.test.length; i++){
              if($scope.test[i]==a){
              $scope.test.splice(i,1);
              }
            }
          }
          else{
            if($scope.test.length==$scope.number){
              $scope.pinakas[a]=!$scope.pinakas[a];
              var id=$scope.test.shift();
              $scope.test.push(a);
              $('#checkbox_'+[id]).prop('checked', false);
              $scope.pinakas[id]=false;
            }
            else{
              $scope.pinakas[a]=!$scope.pinakas[a];
              $scope.test.push(a);
            }
          }       
        }

      }


    }
})();


