'use-strict';

var app = angular.module('searchSymptom',[]);
app.controller('symptom-ctrl',function($scope,$location){

   
});

app.run(function ($rootScope,$location) {
    $rootScope.$on('$locationChangeSuccess', function (evt,newUrl) {
        debugger;
        console.log('$locationChangeSuccess changed!', new Date());
        console.log($location.url());
    });
});