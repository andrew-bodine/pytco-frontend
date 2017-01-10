'use strict';

var module = angular.module('pytco.season', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/season', {
    templateUrl: 'season/season.html'
  })
}]);
