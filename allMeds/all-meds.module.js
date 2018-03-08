'use-strict';
var index;
angular.module('all-meds',["core.dataService","ngRoute"])
    .controller('all-meds-ctrl',["dataService","$scope",function(ds,$scope){
        var med = ds.disArr.query(function(data){
               $scope.medicines =  data.medicines;
               index = data.medicines;
        });

    }])
    .controller('medDetailCont',function($routeParams,$scope){
        var id = $routeParams.id;
        var medObj = index[id];
        $scope.medName = medObj.Name;
    });