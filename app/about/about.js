'use strict';

var module = angular.module('pytco.about', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'about/about.html',
    controller: 'AboutCtrl'
  })
}]);

module.controller('AboutCtrl', [
  '$scope',
  'CloudFront',
  AboutCtrl
]);

function stripExtension (name) {
  return name.split('.')[0];
}

function AboutCtrl ($scope, CloudFront) {
  $scope.members = [];
  $scope.officers = [];

  CloudFront.get('staff/500x500/')
  .then(function (keys) {

    for (var i = 0; i < keys.length; i++) {
      var parts = keys[i].split('/').slice(2);
      var url = encodeURI(CloudFront.baseUrl + '/' + keys[i]);

      if (parts[0] === 'officers') {
        $scope.officers.push({
          position: parts[1],
          name: stripExtension(parts[2]),
          src: url
        })
      }
      else {
        $scope.members.push({
          name: stripExtension(parts[0]),
          src: url
        });
      }
    }

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get board officer media from CloudFront: ', err);
  });
}
