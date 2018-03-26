(function () {
'use strict';

var config = window.config,
	mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = config.map.accessToken;

function mapService($document, $http, layerService, markerService) {
	var mapService = this;

	mapService.mapStyle = config.map.styles.dark;
	mapService.splashScreen = null;

	mapService.map = new mapboxgl.Map({
		container: config.map.container,
		style: mapService.mapStyle,
		center: config.map.center,
		zoom: config.map.zoom
	})
		.addControl(new mapboxgl.NavigationControl(), config.map.control)
		.on('styledata', function (event) {
			if (event.target._loaded) {
				if (!mapService.splashScreen.hasClass('hidden')) {
					mapService.splashScreen.addClass('hidden');

					angular.element($document[0].querySelectorAll('map-layers ul.layers li.biosphere div'))
						.addClass('active');
				}
			}
			
			return true;
		})
		.on('load', function () {
			$http.get('/layers', {
				params: {
					fields: config.layers.biosphere.postgres.fields,
					table: config.layers.biosphere.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var biosphere = config.layers.biosphere.layer;
						biosphere.source.data = data.data;

						mapService.map.addLayer(biosphere);
						layerService.layers.push(biosphere);

					} else
						console.error('Data Error:\n', data);

                    return true;

                }, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
                });

			$http.get('/layers', {
				params: {
					fields: config.layers.office.postgres.fields,
					table: config.layers.office.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						markerService.setMarkers(data);
					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.places.postgres.fields,
					table: config.layers.places.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data)
						markerService.setMarkers(data);
					else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			$http.get('/layers', {
				params: {
					fields: config.layers.trails.postgres.fields,
					table: config.layers.trails.postgres.table
				}
			})
				.then(function success(data) {
					if (data && data.data) {
						var trails = config.layers.trails.layer;
						trails.source.data = data.data;

						mapService.map.addLayer(trails);
						layerService.layers.push(trails);

						markerService.setMarkers(data);

					} else
						console.error('Data Error:\n', data);

					return true;

				}, function failure(data) {
					console.error('Query Failed:\n', data);
					return true;
				});

			return true;
		});

	return mapService;
}

mapService.$inject = ['$document', '$http', 'layerService', 'markerService'];

module.exports = mapService;

return true;
})();
