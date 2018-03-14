'use strict';
angular.module('core.dataService', ['ngResource'])
    .factory('dataService', ['$resource',
        function () {
            var factory = {};
            factory.medicines = function getData() {
                var arr = [];
                $.ajax({
                    url: "https://cmep2000221641trial.hanatrial.ondemand.com/consultme/view/mediData.xsodata/Medicines?%24expand=SymptomsAso%2CIngredientsAso&%24format=json",
                    type: "GET",
                    cache: false,
                    async: false,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("DBUSER" + ":" + "Welcome1"));
                    },
                    success: function (data) {
                        var data = data.d.results;
                        $.each(data, function (i, v) {
                            var obj = {};
                            obj.medId = v.SNO;
                            obj.Name = v.NAME;
                            var symps = [];
                            $.each(v.SymptomsAso.results, function (i, sympV) {
                                symps.push(sympV.NAME);
                            });
                            obj.Symptoms = symps;
                            var ingr = [];
                            $.each(v.IngredientsAso.results, function (i, ingrV) {
                                ingr.push(ingrV.NAME);
                            });
                            obj.Ingredients = ingr;
                            arr.push(obj);
                        });
                    },
                    error: function (err) {
                        alert("Something went wrong. Please try again later.");
                        console.log(err);
                    }
                });
                return arr;
            }
            
            return factory;

        }
    ]);
