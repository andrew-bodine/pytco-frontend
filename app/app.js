'use strict';

var module = angular.module('pytco', [
  'ngRoute',
  'pytco.aws',
  'pytco.home',
  'pytco.gallery',
  'pytco.about',
  'pytco.sampson',
  'pytco.contact'
]);

module.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix(['!']);

  $routeProvider.otherwise({redirectTo: '/'});
}]);

module.run(['CloudFront', '$rootScope', function (CloudFront, $rootScope) {
  $rootScope.cloudfront = CloudFront.baseUrl;
}]);
