'use strict';
angular.module('core.dataService')
    .factory('dataService', ['$resource',
        function($resource) {
            return {
                "disArr":$resource('data/disToMed.json',{},{
                    query:{
                        method:'GET',
                        isArray: true
                    }
                }),
                "diseases": $resource('data/diseases.json', {}, {
                    query: {
                        method: 'GET',
                        isArray: false
                    }
                }),

                "medicines": $resource('data/medicine.json', {}, {
                    query: {
                        method: 'GET',
                        isArray: false
                    }
                })
            }
        }
    ]);
