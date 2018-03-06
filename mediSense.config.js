'use strict';

angular.
  module('mediSenseApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          templateUrl: 'home/home.template.html',
          controller: 'home-ctrl'
        }).
        when('/allMeds', {
            templateUrl: 'allMeds/all-meds.template.html',
            controller: 'all-meds-ctrl'
        }).
        when('/body', {
            templateUrl: 'body/body.template.html',
            controller: 'body-ctrl'
        }).
        otherwise('/home');
    }
  ])
  .controller();