'use-strict';
angular.module('all-meds',["core.dataService"])
    .controller('all-meds-ctrl',["dataService","$scope",function(ds,$scope){
      
        
        var med = ds.disArr.query(function(data){
               $scope.medicines =  data.medicines;
        });
    }]);