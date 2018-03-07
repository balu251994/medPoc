'use strict';
angular.module('core.dataService')
    .factory('dataService', ['$resource',
        function($resource) {
            return {
                "disArr":$resource('data/medicineData.json',{},{
                    query:{
                        method:'GET',
                        isArray: false
                    }
                })
            }
        }
    ]);
