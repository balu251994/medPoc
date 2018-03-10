'use-strict';
var token;
var app = angular.module('searchSymptom', ["core.dataService"]);
app.controller('symptom-ctrl', ["$scope", "dataService", function ($scope, ds) {
    $scope.Symptoms = [{"Name":"Hello"}];
    var sym = ds.medArr.query(function (data) {
        $scope.medicines = data.medicines;
        var medArr = data.medicines;
        if (medArr) {
            var map = new Map();
            $.each(medArr, function (index, value) {
                $.each(value.Symptoms, function (indS, valS) {
                    if (map.get(valS)) {
                        map.get(valS).push(value.Name);
                    } else {
                        var arr = [];
                        arr.push(value.Name);
                        map.set(valS, arr);
                    }
                });
            });
            var arr = [];
            $.map = map;
            $.each(Array.from(map), function (i, v) {
                var obj = {};
                obj.Name = v[0];
                obj.Meds = [];
                obj.Meds = v[1];
                arr.push(obj);
            });

            $scope.GenSymptomsArray = arr;
            
            $scope.$apply(function(){
                console.log("inside");
                $scope.Symptoms = arr;
            })
            $scope.Type = "gen";
        }
    });

   /* var allSymp = ds.symptomArr.query(function (data) {
        var symps = data.symptoms;
        var checkMap = $.map;
        // Check Medicine Data Map for existing records for a symptom

        $.each(symps, function (i, v) {
            var name = v.Name;
            if (checkMap.get(name)) {
                v.Meds = checkMap.get(name);
                checkMap.delete(name);
            }
        });

        // Merge remaining medicine data to A2Z symptom Array
        var remArr = Array.from(checkMap);

        $.each(remArr, function (i, v) {
            var obj = {};
            obj.Name = v[0];
            obj.Meds = [];
            obj.Meds = v[1];
            symps.push(obj);
        });
        $scope.A2ZSymptoms = symps;
    });

    $scope.symTypeClick = function (inactLi, inactA, actLi, actA, symType) {
        if (!$(inactLi).hasClass('active')) {
            $(inactLi).addClass('active');
            $(inactA).addClass('navActive');
            $(inactA).removeClass('navInactive');
            $(actLi).removeClass('active');
            $(actA).removeClass('navActive');
            $(actA).addClass('navInactive');
        }

        if (symType === "genSym") {
            $scope.Symptoms = $scope.GenSymptomsArray;
            $scope.Type = "gen";
        } else {
            $scope.Symptoms = $scope.A2ZSymptoms;
            $scope.Type = "a2z";
        }
    }*/
}]);
