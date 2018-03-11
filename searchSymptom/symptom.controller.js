'use-strict';
var token;
var app = angular.module('searchSymptom', ["core.dataService"]);
app.controller('symptom-ctrl', ["$scope", "dataService", "symptomDataService", function ($scope, ds, sympDataSvc) {
    var me = this;
    if (!sympDataSvc.getGenSymp()) {
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
                $scope.map = map;
                $.each(Array.from(map), function (i, v) {
                    var obj = {};
                    obj.Name = v[0];
                    obj.Meds = [];
                    obj.Meds = v[1];
                    arr.push(obj);
                });

                $scope.GenSymptomsArray = arr;
                sympDataSvc.setGenSymp(arr);
                $scope.Symptoms = arr;
                $scope.Type = "gen";
            }
        });
    }

    if (!sympDataSvc.getA2ZSymp()) {
        var allSymp = ds.symptomArr.query(function (data) {
            var symps = data.symptoms;
            var checkMap = $scope.map;
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
            sympDataSvc.setA2ZSymp(symps);
        });
    }

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
            $scope.Symptoms = sympDataSvc.getGenSymp();
            $scope.Type = "gen";
        } else {
            $scope.Symptoms = sympDataSvc.getA2ZSymp();
            $scope.Type = "a2z";
        }
    }

    if (sympDataSvc.getListType() === "a2z") {
        $scope.symTypeClick('#a2zSym', '#a2zSymA', '#genSym', '#genSymA', 'a2zSym');
    }
}]);
app.controller('symptomDetail-ctrl', ["symptomDataService", "$routeParams", "$scope", function (sympDataSvc, $routeParams, $scope) {
    var key = $routeParams.id;
    var type = $routeParams.type;
    sympDataSvc.setListType(type);
    if(type === "gen"){
        var data = sympDataSvc.getGenSymp();
        data = $.grep(data,function(v){
            if(v.Name === key){
                return true;
            }
        });
        $scope.medication = data[0];
    }else{
        var data = sympDataSvc.getA2ZSymp();
        data = $.grep(data,function(v){
            if(v.Name === key){
                return true;
            }
        });
        $scope.medication = data[0];
    }
}]);

// Service to share data among controllers
app.service('symptomDataService', function () {

    var me = this;
    var gen = [];
    var a2z = [];
    var type = "";

    return {
        getGenSymp: function () {
            return me.gen;
        },

        setGenSymp: function (data) {
            me.gen = data;
        },

        getA2ZSymp: function () {
            return me.a2z;
        },

        setA2ZSymp: function (data) {
            me.a2z = data;
        },

        getListType: function () {
            return me.type;
        },

        setListType: function (type) {
            me.type = type;
        }
    }
});
