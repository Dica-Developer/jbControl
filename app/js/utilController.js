/*global angular*/
(function(angular) {
  'use strict';

  /* Controllers */

  angular.module('jbControl')
    .controller('UtilController', ['$scope', 'Utils', '$interval',

      function($scope, Utils, $interval) {
        $scope.isOnline = false;

        $scope.openExternal = function(url) {
          Utils.openExternal(url);
        };

        $interval(function() {
          $scope.isOnline = Utils.isOnline();
        }, 5000);

        $scope.share = function(text) {
          Utils.share(text);
        };
      }
    ]);
}(angular));
