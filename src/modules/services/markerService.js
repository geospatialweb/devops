(function () {
'use strict';

var mapboxgl = require('mapbox-gl');

function markerService()
{
	var markerService = this;

	markerService.markers = [];
	markerService.markersHash = {};

	markerService.createMarkersHash = function ()
	{
		markerService.markers.forEach(function (marker, index)
		{
			var element = marker[0].getElement();

			markerService.markersHash[element.id] = index;
			return true;
		});

		return true;
	};

	markerService.setMarkers = function (data)
	{
		var layer = data.config.params.table;

		switch (layer)
		{
			case 'office':
				var office = [];

				data.data.features.forEach(function (feature)
				{
					var element = document.createElement('div');

					element.id = layer;
					element.className = layer + '-marker';

					office.push(
						new mapboxgl.Marker(element)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					);

					return true;
				});

				markerService.markers.push(office);

				break;

			case 'places':
				var places = [];

				data.data.features.forEach(function (feature)
				{
					var element = document.createElement('div');

					element.id = layer;
					element.className = layer + '-marker';

					places.push(
						new mapboxgl.Marker(element)
							.setLngLat(feature.geometry.coordinates)
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					);

					return true;
				});

				markerService.markers.push(places);

				break;

			case 'trails':
				var trails = [];

				data.data.features.forEach(function (feature)
				{
					var element = document.createElement('div');

					element.id = layer;
					element.className = layer + '-marker';

					trails.push(
						new mapboxgl.Marker(element)
							.setLngLat([feature.properties.lng, feature.properties.lat])
							.setPopup(new mapboxgl.Popup({
								offset: 15
							})
								.setHTML('<b>' + feature.properties.name + '</b><br>' + feature.properties.description))
					);

					return true;
				});

				markerService.markers.push(trails);

				break;
		}

		return true;
	};

	return markerService;
}

module.exports = markerService;

return true;
})();