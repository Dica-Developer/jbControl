/*global angular*/
(function(angular) {
  'use strict';

  angular.module('jbControl')
    .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector, $location) {
          console.warn('Url "' + $location.$$url + '" not found.');
          return '/';
        });
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: '../templates/root.html',
            controller: 'RootController'
          });
      }
    ]);
}(angular));
