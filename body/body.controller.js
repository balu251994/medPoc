"use strict";
angular.module('body', ['core.dataService'])
    .controller('body-ctrl', ["dataService", "$scope", function(ds, $scope) {
        $scope.bodyTap = function(target) {
            console.log("body part: " + target);
        };
    }
]);