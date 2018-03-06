"use strict";

angular.module('home', ["cordovaGeolocationModule"])
    .controller('home-ctrl', function ($scope, cordovaGeolocationService) {

        $scope.searchText = "";
        $scope.navigate = function (target) {
            if (target === "body") {
                window.location.href = "#!/body";
            } else {
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