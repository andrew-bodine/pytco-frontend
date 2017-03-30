'use strict';

var module = angular.module('pytco.contact', [
  'ngRoute'
]);

module.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html'
  })
}]);

module.controller('ContactCtrl', [
  ContactCtrl
]);

var map;

function ContactCtrl() {
	initMap();
}

function initMap() {

	var uluru = {lat: 42.661511, lng: -77.052271};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 14,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});

	var infoWindow = new google.maps.InfoWindow({
                content: "130 E Elm St. <br>Penn Yan, NY <br>14527"
            });
	infoWindow.open(map, marker);
}