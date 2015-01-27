/*global angular, window*/
(function(angular) {
  'use strict';

  if (typeof window._ === 'undefined') {
    window._ = require('lodash');
  }

  angular.module('jbControl', [
    'ui.router',
    'ui.select',
    'ui.bootstrap',
    'ngSanitize'
  ]);

}(angular));
