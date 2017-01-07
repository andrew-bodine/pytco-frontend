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

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

module.run(['CloudFront', '$rootScope', function (CloudFront, $rootScope) {
  $rootScope.cloudfront = CloudFront.baseUrl;
}]);
