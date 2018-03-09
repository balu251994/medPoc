"use strict";

angular.module('home', ["cordovaGeolocationModule"])
    .controller('home-ctrl', function ($scope,$location,cordovaGeolocationService) {

        $scope.searchText = "";
        $scope.navigate = function (target) {
            if (target === "allMeds"){
                $location.path("/allMeds");
            }else if (target === "body") {
                $location.path("/body");
            } else if (target === 'symptom'){
                $location.path("/symptom");
            }else {
                cordovaGeolocationService.getCurrentPosition(function (position) {
                    $scope.currentPosition = position;
                    $scope.longitude = position.coords.longitude
                    $scope.latitude = position.coords.latitude;
                    var mapLoc = "https://www.google.com/maps/search/" + target + "/@" + $scope.longitude + "," + $scope.latitude + "," + "16z";
                    window.open(mapLoc, "_blank");
                });
            }
        }
    });