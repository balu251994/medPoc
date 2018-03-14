'use-strict';
var index;
var app = angular.module('all-meds', ["core.dataService", "ngRoute"])
    .controller('all-meds-ctrl', ["dataService", "$scope", function (ds, $scope) {
      /*  var med = ds.medArr.query(function (data) {
            $scope.medicines = data.medicines;
            
        }); */
        $scope.medicines = ds.medicines();
        index = $scope.medicines;
    }])
    .controller('medDetailCont', function ($routeParams, $scope) {
        var key = parseInt($routeParams.id);
        var medData = $.grep(index,function(v){
            if(v.medId === key){
                return true;
            }
        });
        $scope.medObj = medData[0];
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