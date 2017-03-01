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

  // Points to an album in $scope.albums.
  $scope.modalAlbum = {};

  // viewAlbum updates $scope.modalAlbum to the album index that was clicked,
  // and loads the album images from CloudFront.
  $scope.viewAlbum = function (index) {
    if ($scope.albums[index].images.length > 0) return;

    CloudFront.get('gallery/' + $scope.albums[index].name + '/')
    .then(function (keys) {
      for (var i = 0; i < keys.length; i++) {
        var url = encodeURI(CloudFront.baseUrl + '/' + keys[i]);

        $scope.albums[index].images.push({src: url});
      }

      $scope.$apply();
    })
    .catch(function (err) {
      console.error('Failed to get album media from CloudFront: ', err);
    });

    $scope.modalAlbum = $scope.albums[index];
  };

  // Query CloudFront service for the keys that correspond
  // to the gallery-thumbnails folder in S3 pytco bucket.
  CloudFront.get('gallery-thumbnails/')
  .then(function (keys) {

    for (var i = 0; i < keys.length; i++) {
      var parts = keys[i].split('/').slice(1);

      if (albumIndex.indexOf(parts[0]) <= -1) {
        var indexOfLastDot = parts[0].lastIndexOf('.');
        var name = parts[0].slice(0, indexOfLastDot);
        var url = encodeURI(CloudFront.baseUrl + '/' + keys[i]);

        albumIndex.push(name);

        $scope.albums.push({
          name: name,
          thumbnail: {src: url},
          images: []
        });
      }
    }

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get gallery media from CloudFront: ', err);
  });
}
