'use strict';

var module = angular.module('pytco.gallery', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/gallery', {
    templateUrl: 'gallery/gallery.html',
    controller: 'GalleryCtrl'
  })
}]);

module.controller('GalleryCtrl', [
  '$scope',
  'CloudFront',
  GalleryCtrl
]);

function GalleryCtrl ($scope, CloudFront) {
  $scope.albums = [];
  var albumIndex = [];

  CloudFront.get('gallery/')
  .then(function (keys) {

    keys.forEach(function (k) {
      var parts = k.split('/').slice(1);

      if (albumIndex.indexOf(parts[0]) <= -1) {
        albumIndex.push(parts[0]);

        $scope.albums.push({
          name: parts[0],
          images: []
        });
      }

      if (parts[1] !== '') {
        var index = albumIndex.indexOf(parts[0]);
        var url = new URL(k, CloudFront.baseUrl);

        $scope.albums[index].images.push({src: url.href});
      }
    });

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get gallery media from CloudFront: ', err);
  });
}
