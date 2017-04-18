'use strict';

var module = angular.module('pytco.sampson', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/sampson', {
    templateUrl: 'sampson/sampson.html',
    controller: 'SampsonCtrl'
  })
}]);

module.controller('SampsonCtrl', [
  '$scope',
  'CloudFront',
  SampsonCtrl
]);

function SampsonCtrl ($scope, CloudFront) {
  $scope.images = [];

  // slide() is a workaround for weird behavior with ng-class in
  // the home carousel template. Here we simply call the .carousel()
  // method that is provided by Bootstrap libs.
  $scope.slide = function (direction) {
    var action = 'next';

    if(direction === 'prev') action = direction;

    $('#carousel-sampson').carousel(action);
  };

  // Fetch the images under the sampson directory in S3 storage, and build
  // up an array of images that will drive how Angular renders the sampson
  // images to the home carousel.
  CloudFront.get('sampson/')
  .then(function (keys) {
    var loaded = 0;

    for (var i = 0; i < keys.length; i++) {
      var img = new Image();

      img.src = encodeURI(CloudFront.baseUrl + '/' + keys[i]);
      img.alt = keys[i];

      $scope.images.push(img)
    }

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get sampson carousel media from CloudFront: ', err);
  });
}

