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

function FilmstripCtrl ($scope, CloudFront) {
  // $scope.slidesArr = [];

  CloudFront.get('filmstrip/')
  .then(function (keys) {
    var children = [];
    var loaded = 0;
    slidesArr = [];

    keys.forEach(function (k) {
      var img = document.createElement('img');
      img.src = new URL(k, CloudFront.baseUrl);
      img.onload = function () {
        loaded = loaded + 1;

        // If this is the last image to load
        // start the rendering logic
        if (loaded == keys.length) {
          getSlides(children);
          fillViewer(0);

          $scope.$apply();
        }

      };
      children.push(img);
    });
  })
  .catch(function (err) {
    console.error('Failed to get filmstrip media from CloudFront: ', err);
  });
}

var slidesArr = [];
var viewerX;
var firstSlide = 0;

function resizeImg(x){
    var image = x;
    var ogHeight = image.height;
    var ogWidth = image.width;
    console.log('Height: ', image.height);
    console.log('Width: ', image.width);
    var ratio = ogWidth / ogHeight;
    var newHeight = 250;
    var newWidth = newHeight * ratio;
    image.height = newHeight;
    image.width = newWidth;
}

function getSlides(children) {

  // Only difference here you don't need to search the DOM for your imgs, we
  // are pulling them from AWS CloudFront now, and passing you the same kind
  // of data structure that you had before.
  var slidesChild = children;
  for (var i = 0; i <= slidesChild.length - 1; i++) {
      resizeImg(slidesChild[i]);
      slidesArr.push(slidesChild[i]);
  }
}

function measure() {
    var viewer = document.getElementById('indexCarousel');
    viewerX = viewer.offsetWidth;
}

function wrap(x) {
    var x = x;
    if (x > slidesArr.length-1) {
        firstSlide = x % slidesArr.length;
    }
    else if (x < 0){
        firstSlide = slidesArr.length - Math.abs(x);
    }
    else firstSlide = x;
}

function fillViewer(x) {
    var filmStrip = document.getElementById('filmStrip');
    wrap(x);
    var index = firstSlide;
    // console.log(index + 'index');
    var filmArr = [];
    var filmLength = 0;
    measure();
    for (index; index <= slidesArr.length - 1; index++) {
        if (filmLength < viewerX) {
            filmArr.push(slidesArr[index]);
            filmLength += slidesArr[index].width;
            // if (index == slidesArr.length - 1) {
            //     index = -1;
            // }
        } else break;
    }
    filmStrip.setAttribute('style', 'width:' + filmLength + 'px');
    for (var i = 0; i <= filmArr.length - 1; i++) {
        filmStrip.appendChild(filmArr[i]);
    }
}

function clearViewer() {
    var filmStrip = document.getElementById('filmStrip');
    while(filmStrip.firstChild) {
        filmStrip.removeChild(filmStrip.firstChild);
    }
}

function slideLeft() {
    // stop interval
    clearViewer();
    firstSlide -= 1;
    fillViewer(firstSlide);
}

function slideRight() {
    // stop interval
    clearViewer();
    firstSlide += 1;
    fillViewer(firstSlide);
}
