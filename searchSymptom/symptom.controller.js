'use-strict';
var token;
var app = angular.module('searchSymptom', ["core.dataService"]);
app.controller('symptom-ctrl', ["$scope", "dataService", "symptomDataService", function ($scope, ds, sympDataSvc) {
    var me = this;
    if (!sympDataSvc.getGenSymp()) {
        var sym = ds.medicines();
        $scope.medicines = sym;
        var medArr = sym;
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
    }

    if (sympDataSvc.getListType() === "a2z") {
        $scope.symTypeClick('#a2zSym', '#a2zSymA', '#genSym', '#genSymA', 'a2zSym');
    } else {
        $scope.Symptoms = sympDataSvc.getGenSymp();
        $scope.Type = "genSym";
        //  $scope.symTypeClick('#genSym', '#genSymA','#a2zSym', '#a2zSymA', 'genSym');
    }
}]);
app.controller('symptomDetail-ctrl', ["symptomDataService", "$routeParams", "$scope", function (sympDataSvc, $routeParams, $scope) {
    var key = $routeParams.id;
    var type = $routeParams.type;
    sympDataSvc.setListType(type);
    if (type === "genSym") {
        var data = sympDataSvc.getGenSymp();
        data = $.grep(data, function (v) {
            if (v.Name === key) {
                return true;
            }
        });
        $scope.medication = data[0];
    } else {
        var data = sympDataSvc.getA2ZSymp();
        data = $.grep(data, function (v) {
            if (v.Name === key) {
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
