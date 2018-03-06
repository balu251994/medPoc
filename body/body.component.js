"use strict";

angular.module('body')
    .controller('body-ctrl', ["dataService", "$scope", function(ds, $scope) {
        $scope.bodyTap = function(target) {
            console.log("body part: " + target);
        };
    }
]);