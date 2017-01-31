'use strict';

var module = angular.module('pytco.aws', []);

module.service('CloudFront', [
  '$http',
  CloudFront
]);

function CloudFront ($http) {

  // This gets replaced during build time by our grunt-replace task.
  this.baseUrl = "CLOUDFRONT_URL";

  var distribution = [];

  function index (options) {
    return new Promise(function (resolve, reject) {
      if (distribution.length > 0) return resolve();

      $http.get(baseUrl, options)
      .then(
        function (resp) {
          var parser = new window.DOMParser();
          var d = parser.parseFromString(resp.data, "text/xml");

          var listBucketResult = d.documentElement;
          var contents = listBucketResult.getElementsByTagName('Contents');

          // TODO: handle d.isTruncated = true

          for (var c = 0; c < contents.length; c++) {
            var k = contents[c].getElementsByTagName('Key')[0].innerHTML;

            // Don't index directory keys
            if (k.slice(-1) === "/") continue;

            // Don't duplicate keys in index
            if (distribution.indexOf(k) > -1) return;

            distribution.push(k);
          }

          resolve();
        },
        function (err) {
          reject(err);
        }
      );
    });
  };

  this.get = function (prefix) {
    return new Promise(function (resolve, reject) {
      index({cache: true})
      .then(function () {
        var filtered = distribution.filter(function (e) {
          return e.indexOf(prefix) == 0;
        });

        resolve(filtered);
      })
      .catch(function (err) {
        reject(err);
      })
    });
  };
}
