'use-strict';
var index;
angular.module('all-meds', ["core.dataService", "ngRoute"])
    .controller('all-meds-ctrl', ["dataService", "$scope", function (ds, $scope) {
        var med = ds.disArr.query(function (data) {
            $scope.medicines = data.medicines;
            index = data.medicines;
        });

    }])
    .controller('medDetailCont', function ($routeParams, $scope) {
        var id = $routeParams.id;
        $scope.medObj = index[id];
        $('.collapseBtnUpper').click(function () {
            var angle = $('.glyphAnimateUpper').css("transform");
            if (angle === "none" || angle === "matrix(1, 0, 0, 1, 0, 0)") {
                $('.glyphAnimateUpper').css("transform", "rotate(180deg)");
            } else {
                $('.glyphAnimateUpper').css("transform","rotate(0deg)");
            }
        });

        
        $('.collapseBtnLower').click(function () {
            var angle = $('.glyphAnimateLower').css("transform");
            if (angle === "none" || angle === "matrix(1, 0, 0, 1, 0, 0)") {
                $('.glyphAnimateLower').css("transform", "rotate(180deg)");
            } else {
                $('.glyphAnimateLower').css("transform","rotate(0deg)");
            }
        });
    });