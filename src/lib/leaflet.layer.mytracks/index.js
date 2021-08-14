import L from 'leaflet';
import iconFromBackgroundImage from '~/lib/iconFromBackgroundImage';
import './style.css';
import 'leaflet.vectorgrid/src/Leaflet.VectorGrid'; // eslint-disable-line import/no-unassigned-import
import 'leaflet.vectorgrid/src/Leaflet.VectorGrid.Protobuf'; // eslint-disable-line import/no-unassigned-import

L.Layer.MyTracksRaster = L.TileLayer.extend({
    initialize: function(options) {
        L.TileLayer.prototype.initialize.call(
            this,
            'https://tiles.sikmir.ru/services/rtracks/tiles/{z}/{x}/{y}.png',
            options
        );
    },
});

L.Layer.MyTracksVector = L.VectorGrid.Protobuf.extend({
    options: {
        interactive: true,
        vectorTileLayerStyles: {
            trk: {
                weight: 3,
                color: '#a626ff'
            },
            wpt: function(properties) {
                const color = properties.type === 'campsite' ? 'green' : 'red';
                return {
                    weight: 4,
                    color: color,
                    opacity: 1,
                    fillColor: color,
                    fill: true,
                    radius: 5,
                    fillOpacity: 1
                };
            },
        },
        getFeatureId: (f) => f.properties.name,
    },

    initialize: function(options) {
        L.VectorGrid.Protobuf.prototype.initialize.call(
            this,
            'https://tiles.sikmir.ru/services/vtracks/tiles/{z}/{x}/{y}.pbf',
            options
        );
        this.on('click', this._onClick, this);
    },

    _onClick: function(e) {
        if (!this._map) {
            return;
        }
        const properties = e.layer.properties;
        const description = this._makeTrackInfo(properties);
        this.setFeatureStyle(properties.name, {
            weight: 6,
            color: 'red'
        });
        L.popup()
            .setContent(description)
            .setLatLng(e.latlng)
            .openOn(this._map)
            .on('remove', function() {
                this.resetFeatureStyle(properties.name);
            }.bind(this));
        L.DomEvent.stop(e);
    },

    _makeTrackInfo: function(properties) {
        let info = `<b>${properties.name}</b>`;
        if ('distance' in properties) {
            const icon = iconFromBackgroundImage(`mytracks-${properties.type}`);
            info += `<br/><img src="${icon.url}"/>&nbsp;${properties.distance / 1000}&nbsp;km`;
        }

        let links = [];
        if ('file' in properties) {
            links.push({
                text: 'GPX',
                href: `/tracks/${properties.file}`
            });
        }
        let i = 1;
        while (`link${i}_href` in properties && `link${i}_text` in properties) {
            links.push({
                text: properties[`link${i}_text`],
                href: properties[`link${i}_href`]
            });
            i += 1;
        }
        links = links.map((l) => `<a href="${l.href}">${l.text}</a>`);
        info += `<br/>${links.join(' | ')}`;

        return info;
    },
});
