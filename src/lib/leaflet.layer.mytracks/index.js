import L from 'leaflet';

L.Layer.MyTracksRaster = L.TileLayer.extend({
    initialize: function(options) {
        L.TileLayer.prototype.initialize.call(
            this,
            'https://tiles.sikmir.ru/services/rtracks/tiles/{z}/{x}/{y}.png',
            options
        );
    },
});
