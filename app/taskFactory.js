angular.module('TaskTimerModule')
    .factory('mySerivce', function() {
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