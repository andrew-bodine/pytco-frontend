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

    $scope.albums = $scope.albums.sort(sortAlbums);

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get gallery media from CloudFront: ', err);
  });
}

function sortAlbums(a, b) {
    // We expect date labels to be in one of the following
    // formats:
    // Name - Month Year
    // Name - Year
    // Name

    var aParts = a.name.split('-');
    var bParts = b.name.split('-');

    // If a doesn't have some sort of date labels, then b is
    // always greater.
    if (aParts.length <= 1) return -1;

    // If b doesn't have some sort of date labels, then a is
    // always greater.
    if (bParts.length <= 1) return 1;

    // Remove leading/trailing whitespace characters
    aParts = aParts[1];
    bParts = bParts[1];
    aParts = aParts.replace(/^\s*/, '').replace(/\s*$/, '');
    bParts = bParts.replace(/^\s*/, '').replace(/\s*$/, '');

    var aLabels = aParts.split(' ');
    var bLabels = bParts.split(' ');

    var aYear = 0, bYear = aYear;
    var aMonth = months[11], bMonth = aMonth;

    if (aLabels.length > 1) {
        aMonth = aLabels[0];
        aYear = parseInt(aLabels[1]);
    }
    else {
        aYear = aLabels[0];
    }

    if (bLabels.length > 1) {
        bMonth = bLabels[0];
        bYear = parseInt(bLabels[1]);
    }
    else {
        bYear = bLabels[0];
    }

    if (aYear > bYear) return 1;
    if (bYear > aYear) return -1;

    // If we get here, then aYear is equal to bYear. We now
    // have to compare months
    return compareMonths(aMonth.toLowerCase(), bMonth.toLowerCase());
}

var months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

function compareMonths(a, b) {
    if (months.indexOf(a) < 0) return -1;

    if (months.indexOf(b) < 0) return 1;

    if (months.indexOf(a) < months.indexOf(b)) return 1;

    if (months.indexOf(a) == months.indexOf(b)) return 0;

    return -1;
}
