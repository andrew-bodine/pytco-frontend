'use strict';

var module = angular.module('pytco.season', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/season', {
    templateUrl: 'season/season.html',
    controller: 'SeasonCtrl'
  })
}]);

module.controller('SeasonCtrl', [
    '$scope',
    'Season',
    SeasonCtrl
]);

function SeasonCtrl ($scope, Season) {
    $scope.events = [];
    $scope.eventData = {};
    $scope.months = Season.months;

    Season.getEvents((new Date()).getFullYear())
    .then(function (events) {
        $scope.events = events;
        $scope.eventData = Season.getEventData();

        $scope.$apply();
    })
    .catch(function (err) {
        console.error('Failed to get calendar events from CloudFront: ', err);
    });
}

module.service('Season', [
  'CloudFront',
  Season
]);

function Season(CloudFront) {
    var cache = {
        events: [],
        eventData: {}
    };

    this.months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    this.months.forEach(function () {
        cache.events.push([]);
    })

    this.getEvents = function (year) {
        return new Promise(function (resolve, reject) {
            if (cache.events.length > 0 && Object.keys(cache.eventData).length > 0) {
                return resolve(cache.events);
            }

            CloudFront.getJson('season/' + year + '.json')
            .then(function (evts) {

                // Process the event data.
                evts.forEach(function (e) {

                    // If we haven't seen this event title yet, then copy the data
                    // to the eventData cache.
                    if (!cache.eventData[e.title]) {
                        var data = Object.assign({}, e);
                        delete data.dateRanges;
                        delete data.timeRanges;
                        data.image = data.image.replace(/{{\s*cloudfront\s*}}/, CloudFront.baseUrl);
                        cache.eventData[e.title] = data;
                    }

                    // Iterate through event date range definitions.
                    e.dateRanges.forEach(function(dr) {
                        var ends = dr.split('-').map(function (d) {
                            return d.trim();
                        });

                        // Get index into scope events.
                        var month = parseInt(ends[0].split('/')[0]);

                        if (isNaN(month)) {
                            console.log("Failed to parse dateRange", ends[0]);
                            return;
                        }

                        // Start constructing an event pointer.
                        var ptr = {title: e.title};

                        ptr.days = parseInt(ends[0].split('/')[1]).toString();

                        if (ends.length > 1) {
                            ptr.days += ' - ';
                            ptr.days += parseInt(ends[1].split('/')[1]).toString();
                        }

                        // Prepare the times for visualization in 12 hr format. They
                        // are currently in 24 hour format.
                        ptr.timeRanges = e.timeRanges.map(function (tr) {
                        // data.timeRanges = data.timeRanges.map(function (tr) {
                            var times = tr.split('-').map(function (t) {
                                return t.trim();
                            });

                            times = times.map(function (t) {
                                var parts = t.split(':');

                                var hr = parseInt(parts[0]);
                                parts[0] = (hr > 12) ? (hr - 12).toString() : hr.toString();

                                return parts.join(':') + ((hr >= 12) ? "pm" : "am");
                            });

                            return times.join('-');
                        });

                        // Put the event pointer into scope events, in the correct
                        // month group.
                        cache.events[month - 1].push(ptr);

                        // Sort the scope events in that month group.
                        cache.events[month - 1] = cache.events[month - 1].sort(function (x, y) {
                            return x.days.split('-')[0] - y.days.split('-')[0];
                        });
                    });
                });

                return resolve(cache.events);
            })
            .catch(function (err) {
                return reject(err);
            });
        });
    };

    this.getEventData = function () {
        return cache.eventData;
    };
}
