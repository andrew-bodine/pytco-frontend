'use strict';

var module = angular.module('pytco.sampson', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/sampson', {
    templateUrl: 'sampson/sampson.html'
  })
}]);
