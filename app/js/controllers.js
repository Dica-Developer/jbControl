/*global angular, window, _*/
(function(angular) {
  'use strict';

  angular.module('jbControl').controller('RootController', [
    '$scope',
    '$http',
    '$state',
    'Utils',
    'Menu',
    function($scope, $http, $state, Utils) {
      $scope.error = false;
      $scope.scope = $scope;
      $scope.jbAccessToken = null;
      $scope.jiffyboxes = {};
      var configDb = new window.dica.Db();
      configDb.init('jbControl.configuration.db', function() {
        $scope.jbAccessToken = configDb.query({
          key: 'jbAccessToken'
        }).select('value')[0];

        getAllJiffyBoxes();
      });

      $scope.savePreferences = function(jbAccessToken) {
        configDb.query.merge({
          key: 'jbAccessToken',
          value: jbAccessToken
        }, 'key');
        $scope.jbAccessToken = jbAccessToken;
        getAllJiffyBoxes();
      };

      $scope.start = function(boxId) {
        if (Utils.isOnline() && null !== $scope.jbAccessToken) {
          $http.put('https://api.jiffybox.de/' + $scope.jbAccessToken + '/v1.0/jiffyBoxes/' + boxId + '?status=START').success(function() {
            $scope.error = false;
            // refresh box data
          }).error(function(data, status) {
            $scope.error = true;
            $scope.message = data + ' ' + status;
          });
        }
      };

      $scope.stop = function(boxId) {
        if (Utils.isOnline() && null !== $scope.jbAccessToken) {
          $http.put('https://api.jiffybox.de/' + $scope.jbAccessToken + '/v1.0/jiffyBoxes/' + boxId + '?status=SHUTDOWN').success(function() {
            $scope.error = false;
            // refresh box data
          }).error(function(data, status) {
            $scope.error = true;
            $scope.message = data + ' ' + status;
          });
        }
      };

      $scope.freeze = function(boxId) {
        if (Utils.isOnline() && null !== $scope.jbAccessToken) {
          $http.put('https://api.jiffybox.de/' + $scope.jbAccessToken + '/v1.0/jiffyBoxes/' + boxId + '?status=FREEZE').success(function() {
            $scope.error = false;
            // refresh box data
          }).error(function(data, status) {
            $scope.error = true;
            $scope.message = data + ' ' + status;
          });
        }
      };

      $scope.thaw = function(boxId) {
        if (Utils.isOnline() && null !== $scope.jbAccessToken) {
          $http.put('https://api.jiffybox.de/' + $scope.jbAccessToken + '/v1.0/jiffyBoxes/' + boxId + '?status=THAW').success(function() {
            $scope.error = false;
            // refresh box data
          }).error(function(data, status) {
            $scope.error = true;
            $scope.message = data + ' ' + status;
          });
        }
      };

      function getAllJiffyBoxes() {
        if (Utils.isOnline() && null !== $scope.jbAccessToken) {
          $http.get('https://api.jiffybox.de/' + $scope.jbAccessToken + '/v1.0/jiffyBoxes').success(function(data) {
            if (!data.result && data.messages.length > 0) {
              $scope.error = true;
              $scope.message = data.messages;
            } else {
              $scope.error = false;
            }
            $scope.jiffyboxes = _.values(data.result);
            setTimeout(getAllJiffyBoxes, 30000);
          }).error(function(data, status) {
            $scope.error = true;
            $scope.message = data + ' ' + status;
            setTimeout(getAllJiffyBoxes, 30000);
          });
        } else {
          setTimeout(getAllJiffyBoxes, 30000);
        }
      }
    }
  ]);
}(angular));
