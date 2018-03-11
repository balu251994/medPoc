'use strict';

var app = angular.module('mediSenseApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //    $locationProvider.hashPrefix('!');

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
        when('/medDetail/:id', {
          templateUrl: 'allMeds/med-detail.template.html',
          controller: 'medDetailCont'
        }).
        when('/symptom', {
          templateUrl: 'searchSymptom/searchSymptom.template.html',
          controller: 'symptom-ctrl'
        }).
        when('/symptomDetail/:id/:type', {
          templateUrl: 'searchSymptom/symptom-detail.template.html',
          controller: 'symptomDetail-ctrl'
        }).
        otherwise('/home');
    }
  ])
  .controller();
