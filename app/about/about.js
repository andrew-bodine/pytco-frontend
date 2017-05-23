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

// TODO (andrew-bodine): move this to the CloudFront service.
//
// stripExtension takes a chunk of a key returned from the CloudFront
// service, and returns that chunk with any extension removed.
function stripExtension (name) {
  var i = name.lastIndexOf('.');

  // In this case, name doesn't contain an extension format
  // that we recognize.
  if (i == -1) return name;

  return name.slice(0, i);
}

function AboutCtrl ($scope, CloudFront) {
  $scope.members = [];

  CloudFront.get('staff/500x500/')
  .then(function (keys) {

    for (var i = 0; i < keys.length; i++) {
      var parts = keys[i].split('/').slice(2);

      if (parts.length <= 1) continue;

      var url = CloudFront.baseUrl + '/' + encodeURI(keys[i]).replace(/\+/g, '%2B');

      var positions = parts[0].split('+');

      positions = positions.map(function (p) {
        var position = p.replace(/-/g, ' ').split(' ').map(function (i) {
          return i[0].toUpperCase() + i.slice(1);
        }).join(' ');

        // This is temporary until we rename things in S3.
        if (position === 'Board Members') return 'PYTCo Board'

        return position;
      });

      $scope.members.push({
        name: stripExtension(parts[1]),
        src: url,
        positions: positions
      });
    }

    $scope.members = $scope.members.sort(sortMembers);

    $scope.$apply();
  })
  .catch(function (err) {
    console.error('Failed to get board officer media from CloudFront: ', err);
  });
}

var hierarchy = [
    'President',
    'Vice President',
    'Treasurer',
    'Secretary'
]

function sortMembers (a, b) {
    var aOffice = -1,
        bOffice = aOffice;

    for (var i = 0; i < a.positions.length && aOffice == -1; i++) {
        aOffice = hierarchy.indexOf(a.positions[i]);
    }

    for (var i = 0; i < b.positions.length && bOffice == -1; i++) {
        bOffice = hierarchy.indexOf(b.positions[i]);
    }

    if (aOffice == -1 && bOffice == -1) return 0;

    if (aOffice > -1 && bOffice > -1) {
        return (aOffice > bOffice) ? 1 : -1;
    }

    if (aOffice > -1) return -1;
    return 1;
}
