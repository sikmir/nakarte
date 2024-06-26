import L from 'leaflet';

import Contextmenu from '~/lib/contextmenu';
import {ElevationProvider} from '~/lib/elevations';
import {makeButton} from '~/lib/leaflet.control.commons';
import * as logging from '~/lib/logging';

import './style.css';

class ExternalMap {
    constructor(urlTemplate, minZoom, maxZoom) {
        this.url = urlTemplate;
        this.minZoom = minZoom;
        this.maxZoom = maxZoom;
    }

    async getData(map_) {
        const {lat, lng} = map_.getCenter();
        let zoom = map_.getZoom();
        zoom = Math.min(this.maxZoom, zoom);
        zoom = Math.max(this.minZoom, zoom);
        return {lat, lng, zoom};
    }

    async getUrl(map_) {
        return L.Util.template(this.url, await this.getData(map_));
    }
}

class GoogleEarthMap extends ExternalMap {
    constructor() {
        super('https://earth.google.com/web/@{lat},{lng},0a,{dist}d,35y,0h,0t,0r', 0, 100);
    }

    async getData(map_) {
        const data = await super.getData(map_);
        const windowSize = window.innerHeight;
        const earthPerimeter = 40075016;
        const degree = Math.PI / 180;
        const viewAngle = 35;
        let elevation;
        try {
            elevation = (await new ElevationProvider().get([data]))[0];
        } catch (e) {
            elevation = 8000;
            logging.captureException(e, 'failed to get elevation for GoogleEarth link');
        }
        const mercatorPixelSize = (earthPerimeter / (256 * 2 ** data.zoom)) * Math.cos(data.lat * degree);
        const distInPixels = windowSize / 2 / Math.tan((viewAngle * degree) / 2);
        data.dist = distInPixels * mercatorPixelSize + elevation;
        return data;
    }
}

class JOSM extends ExternalMap {
    constructor() {
        super('http://127.0.0.1:8111/load_and_zoom?left={l}&right={r}&top={t}&bottom={b}', 0, 19);
    }

    async getData(map_) {
        const bounds = map_.getBounds();
        const l = bounds.getWest();
        const r = bounds.getEast();
        const t = bounds.getNorth();
        const b = bounds.getSouth();
        return {l, r, t, b};
    }
}

const ExternalMaps = L.Control.extend({
    options: {
        externalMaps: [
            {title: 'Google', externalMap: new ExternalMap('https://www.google.com/maps/@{lat},{lng},{zoom}z', 3, 21)},
            {
                title: 'Yandex',
                externalMap: new ExternalMap('https://yandex.ru/maps/?ll={lng}%2C{lat}&z={zoom}', 2, 21),
            },
            {
                title: 'OpenStreetMap',
                externalMap: new ExternalMap('https://www.openstreetmap.org/#map={zoom}/{lat}/{lng}', 0, 19),
            },
            {title: 'Google Earth 3D', externalMap: new GoogleEarthMap()},
            {
                title: 'Mapy.cz',
                externalMap: new ExternalMap('https://en.mapy.cz/turisticka?x={lng}&y={lat}&z={zoom}', 2, 19),
            },
            {
                title: 'Wikimapia',
                externalMap: new ExternalMap('https://wikimapia.org/#lat={lat}&lon={lng}&z={zoom}', 3, 22),
            },
            {
                title: 'ГИС для ПСР',
                externalMap: new ExternalMap('https://gis.extremum.org/#z={zoom}&c={lat},{lng}', 0, 19),
            },
            {
                title: 'BRouter',
                externalMap: new ExternalMap('https://brouter.de/brouter-web/#map={zoom}/{lat}/{lng}/standard', 0, 19),
            },
            {
                title: 'gpx.studio',
                externalMap: new ExternalMap('https://gpxstudio.github.io/', 0, 19),
            },
            {
                title: 'WTracks',
                externalMap: new ExternalMap('https://opoto.github.io/wtracks/', 0, 19),
            },
            {
                title: 'VeloRadar',
                externalMap: new ExternalMap('http://veloradar.ru/map/', 0, 19),
            },
            {title: 'JOSM', externalMap: new JOSM()},
        ],
    },

    onAdd: function (map) {
        this._map = map;
        const {container, link} = makeButton(null, 'View this place on another map', 'icon-external-links');
        this._container = container;
        L.DomEvent.on(link, 'click contextmenu', this.onClick, this);

        const menuItems = [
            {text: 'View this place on another map', header: true},
            ...this.options.externalMaps.map((it) => ({
                text: it.title,
                callback: this.openExternalMap.bind(this, it.externalMap),
            })),
        ];
        this.menu = new Contextmenu(menuItems);
        return container;
    },

    onClick: function (e) {
        this.menu.show(e);
    },

    async openExternalMap(externalMap) {
        const url = await externalMap.getUrl(this._map);
        window.open(url, '_blank');
    },
});

export {ExternalMaps};
