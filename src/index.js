(function () {
'use strict';

window.config = require('./config/config');

var app = require('angular').module('app', []);

app.service('mapService', require('./modules/services/mapService'));
app.service('setMarkerService', require('./modules/services/setMarkerService'));
app.service('showMarkerService', require('./modules/services/showMarkerService'));

app.controller('mapController', require('./modules/controllers/mapController'));
app.controller('layerController', require('./modules/controllers/layerController'));
app.controller('trailController', require('./modules/controllers/trailController'));

app.directive('mapLayers', require('./modules/directives/layerDirective'));
app.directive('mapTrails', require('./modules/directives/trailDirective'));

return true;
})();
