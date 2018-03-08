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

app.controller('mediSenseController',['$scope','$location',function($scope,$location) {
        
        $scope.back = function(url){
            $location.url(url);
        }
}]);

