'use strict';

var module = angular.module('pytco.home', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'FilmstripCtrl'
  })
}]);

module.controller('FilmstripCtrl', [
  '$scope',
  'CloudFront',
  FilmstripCtrl
]);

var spotlight;

function FilmstripCtrl ($scope, CloudFront) {

  CloudFront.get('filmstrip/')
  .then(function (keys) {
    var images = [];
    var loaded = 0;

    keys.forEach(function (k) {
      var img = document.createElement('img');
      img.src = new URL(k, CloudFront.baseUrl);
      img.onload = function () {
        loaded = loaded + 1;

        // If this is the last image to load
        // start the rendering logic
        if (loaded == keys.length) {
          setFillerWidth(images);

          // Inject the images into the #filmStrip div
          images.forEach(function (image) {
            $('#filmStrip').append(resizeImage(image));
          });

          // Calculate an index that is about in the middle of the children array.
          // This index never changes because we are moving the first and last children
          // around respectively, and gives us some room to do that out of the user's
          // sight.
          spotlight = Math.round($('#filmStrip').children().length / 2);

          centerSpotlight();

          // $scope.$apply();
        }
      };

      images.push(img);
    });

  })
  .catch(function (err) {
    console.error('Failed to get filmstrip media from CloudFront: ', err);
  });
}

function resizeImage (image) {
  var ratio = image.width / image.height;

  image.height = 250;
  image.width = Math.round(250 * ratio);

  return image;
}

// This replaces the need to set the #filmStrip width in css
function setFillerWidth (images) {
  var total = 0;

  // images.each(function (index, image) {
  //   total += image.width;
  // });
  images.forEach(function (image) {
    total += image.width;
  });

  $('#filmStrip').width(total);
}

function slide (direction) {
  // With jQuery, when you prepend() or append() a child,
  // if the child is already one of the parent's children,
  // then jQuery doesn't create another child, it simply
  // moves it.

  if (direction < 0) {
    var lastImage = $('#filmStrip').children().last();
    $('#filmStrip').prepend(lastImage);
  }
  else {
    var firstImage = $('#filmStrip').children().first();
    $('#filmStrip').append(firstImage);
  }

  centerSpotlight();
}

// centerSpotlight() basically calculates what to set the marginLeft
// property of the #filmStrip div, so that the spotlight image is centered.
function centerSpotlight () {
  var widthSum = 0;

  var children = $('#filmStrip').children().slice(0, spotlight + 1);

  children.each(function (index, child) {
    if (index == spotlight) {
      return widthSum += Math.round(child.width / 2);
    }

    widthSum += child.width;
  });

  var adjustment = widthSum - Math.round($('#viewer').width() / 2);

  $('#filmStrip').animate({'marginLeft': '-' + adjustment});
}
