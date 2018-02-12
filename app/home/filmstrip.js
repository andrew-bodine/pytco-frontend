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
  'Season',
  FilmstripCtrl
]);

function FilmstripCtrl ($scope, CloudFront, Season) {
  $scope.images = [];

  // TODO (andrew-bodine): Remove the need for this.
  //
  // slide() is a workaround for weird behavior with ng-class in
  // the home carousel template. Here we simply call the .carousel()
  // method that is provided by Bootstrap libs.
  $scope.slide = function (direction) {
    var action = 'next';

    if(direction === 'prev') action = direction;

    $('#carousel-filmstrip').carousel(action);
  };

  var scrollTimeout = 5000;

  // TODO (andrew-bodine): Remove the need for this.
  //
  // Set a repeating timer that will slide the carousel automatically. Again
  // this shouldn't be necessary as the default implementation of the
  // Bootstrap carousel auto scrolls.
  function scrollTimer() {
      $('#carousel-filmstrip').carousel('next');

      setTimeout(scrollTimer, scrollTimeout);
  }

  // TODO (andrew-bodine): Remove the need for this.
  //
  // Kickoff the initial timer, which initiates the chain.
  setTimeout(scrollTimer, scrollTimeout);

  // Fetch the images under the filmstrip directory in S3 storage, and build
  // up an array of images that will drive how Angular renders the filmstrip
  // images to the home carousel.
  CloudFront.get('filmstrip/')
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
    console.error('Failed to get filmstrip media from CloudFront: ', err);
  });

  $scope.featured = [];

  // Query for featured events from the season service.
  Season.getEvents((new Date()).getFullYear())
  .then(function (events) {
      var seen = {};

      events.forEach(function (month, idx) {
          month.forEach(function (e) {
              var data = Season.getEventData()[e.title];
              if (!data.featured) return;

              if (seen[e.title] && seen[e.title].days.indexOf(e.days) > -1) return;

              if (seen[e.title]) {
                  seen[e.title].days += (", " + e.days);

                  return;
              }

              console.log(e);

              e.month = Season.months[idx];

              var merged = Object.assign(e, data);
              $scope.featured.push(merged);
              seen[e.title] = merged;
          });
      });

      $scope.$apply();
  })
  .catch(function (err) {
      console.error('Failed to get event data from season service:', err);
  })
}
