angular.module('TaskTimerModule')
    .factory('myService', function() {
           var jsonData;
           return {
               setData: function(data) {
                   jsonData = data;
               },
               getData: function() {
                   return jsonData;
               }
           }
    });