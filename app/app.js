'use strict';

var module = angular.module('pytco', [
  'ngRoute',
  'pytco.aws',
  'pytco.home',
  'pytco.season',
  'pytco.gallery',
  'pytco.about',
  'pytco.sampson',
  'pytco.contact'
]);

module.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix(['/']);

  $routeProvider.otherwise({redirectTo: '/'});
}]);

module.run([
    'CloudFront',
    '$rootScope',
    '$window',
    '$location',
    function (CloudFront, $rootScope, $window, $location) {
      $rootScope.cloudfront = CloudFront.baseUrl;

      // Connect to Google Analytics.
      $window.ga('create', 'UA-99751641-1', 'auto');
      $window.ga('send', 'pageview', $location.path());

      // When we do an ng-view in the Angular,
      // send a pageView event to Google Analytics.
      $rootScope.$on('$viewContentLoaded', function (e) {
        $window.ga('send', 'pageview', {
          page: $location.path()
        });
      });
    }
]);
