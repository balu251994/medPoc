"use strict";

var app = angular.module('mediSenseApp', [
    'ngAnimate',
    'ngRoute',
    'core',
    'core.dataService',
    'home',
    'all-meds',
    'body'
]);

app.controller('mediSenseController',["$scope","dataService",function($scope,ds) {
    $scope.btnClick = function(){
        return ds.disArr.query();
    }

    console.log("done")
}]);

