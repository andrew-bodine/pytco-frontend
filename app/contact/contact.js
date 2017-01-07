'use strict';

var module = angular.module('pytco.contact', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html'
  })
}]);
