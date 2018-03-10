'use strict';
angular.module('core.dataService')
    .factory('dataService', ['$resource',
        function($resource) {
            return {
                "medArr":$resource('data/medicineData.json',{},{
                    query:{
                        method:'GET',
                        isArray: false
                    }
                }),

                "symptomArr":$resource('data/A2ZSymptoms.json',{},{
                    query:{
                        method:'GET',
                        isArray: false
                    }
                })
            }
        }
    ]);
