import L from "leaflet";
import '~/lib/leaflet.layer.yandex';
import '~/lib/leaflet.layer.google';
import {BingSatLayer, BingOrdnanceSurveyLayer} from '~/lib/leaflet.layer.bing';
import config from './config';
import '~/lib/leaflet.layer.soviet-topomaps-grid';
import '~/lib/leaflet.layer.westraPasses';
import '~/lib/leaflet.layer.wikimapia';
import {GeocachingSu} from '~/lib/leaflet.layer.geocaching-su';
import {RetinaTileLayer} from '~/lib/leaflet.layer.RetinaTileLayer';
import {urlViaCorsProxy} from '~/lib/CORSProxy';
import '~/lib/leaflet.layer.TileLayer.cutline';
import {getCutline} from '~/lib/layers-cutlines';
import {LayerCutlineOverview} from '~/lib/leaflet.layer.LayerCutlineOverview';
import '~/lib/leaflet.layer.mytracks';

class LayerGroupWithOptions extends L.LayerGroup {
    constructor(layers, options) {
        super(layers);
        L.setOptions(this, options);
    }
}

    const layersDefs = [
                {
                    title: 'OpenStreetMap',
                    description: 'OSM default style',
                    isDefault: true,
                    layer: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        {
                            code: 'O',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'osm',
                            attribution: '<a href="https://www.openstreetmap.org/copyright">' +
                                '&copy; OpenStreetMap contributors</a>',
                        }
                    )
                },
                {
                    title: 'CyclOSM',
                    isDefault: true,
                    layer: L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
                        {
                            code: 'Co',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'cyclosm',
                            attribution:
                                '<a href="https://www.openstreetmap.org/copyright">' +
                                '&copy; OpenStreetMap contributors</a>. ' +
                                'Tiles style by <a href="https://www.cyclosm.org/">CyclOSM</a>',
                        }
                    )
                },
                {
                    title: 'ESRI Satellite',
                    isDefault: true,
                    layer: L.tileLayer(
                        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                        {
                            code: 'E',
                            isOverlay: false,
                            scaleDependent: false,
                            maxNativeZoom: 18,
                            print: true,
                            jnx: true,
                            shortName: 'esri',
                            attribution:
                                '<a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">' +
                                'ESRI World Imagery for ArcGIS</a>',
                        }
                    )
                },
                {
                    title: 'Yandex map',
                    isDefault: false,
                    layer: new L.Layer.Yandex.Map(
                        {
                            scaleDependent: true,
                            code: 'Y',
                            isOverlay: false,
                            print: true,
                            jnx: true,
                            shortName: 'yandex',
                            attribution: '<a href="https://yandex.ru/maps/">Yandex</a>',
                        }
                    )
                },
                {
                    title: 'Yandex Satellite',
                    isDefault: true,
                    layer: new L.Layer.Yandex.Sat(
                        {
                            scaleDependent: false,
                            code: 'S',
                            isOverlay: false,
                            print: true,
                            jnx: true,
                            shortName: 'yandex_sat',
                            attribution: '<a href="https://yandex.ru/maps/?l=sat">Yandex</a>',
                        }
                    )
                },
                {
                    title: 'Google Map',
                    isDefault: true,
                    layer: new L.Layer.GoogleMap(
                        {
                            code: 'G',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'google',
                            attribution: '<a href="https://www.google.com/maps">Google</a>',
                        }
                    )
                },
                {
                    title: 'Google Hybrid',
                    isDefault: false,
                    layer: new L.Layer.GoogleHybrid(
                        {
                            code: 'Gh',
                            isOverlay: true,
                            scaleDependent: true,
                            print: true,
                            jnx: false,
                            shortName: 'google_hybrid',
                            isOverlayTransparent: true,
                            attribution: '<a href="https://www.google.com/maps/@43.0668619,60.5738071,13622628m' +
                                '/data=!3m1!1e3">Google</a>',
                        }
                    )
                },
                {
                    title: 'Google Satellite',
                    isDefault: false,
                    layer: new L.Layer.GoogleSat(
                        {
                            code: 'L',
                            isOverlay: false,
                            scaleDependent: false,
                            print: true,
                            jnx: true,
                            shortName: 'google_sat',
                            attribution: '<a href="https://www.google.com/maps/@43.0668619,60.5738071,13622628m' +
                                '/data=!3m1!1e3">Google</a>',
                        }
                    )
                },
                {
                    title: 'Google Terrain',
                    isDefault: false,
                    layer: new L.Layer.GoogleTerrain({
                            code: 'P',
                            isOverlay: false,
                            scaleDependent: false,
                            print: true,
                            jnx: true,
                            shortName: 'google_terrain',
                            attribution: '<a href="https://www.google.com/maps/@43.1203575,42.1105049,9.58z' +
                                '/data=!5m1!1e4">Google</a>',
                        }
                    )
                },
                {
                    title: 'Bing Satellite',
                    isDefault: true,
                    layer: new BingSatLayer(
                        {
                            code: 'I',
                            isOverlay: false,
                            scaleDependent: false,
                            print: true,
                            jnx: true,
                            shortName: 'bing_sat',
                            attribution: '<a href="https://www.bing.com/maps?style=h">Microsoft</a>',
                        }
                    )
                },
                {
                    title: 'Topomapper 1km',
                    isDefault: true,
                    layer: L.tileLayer(
                        urlViaCorsProxy(
                            'http://88.99.52.155/tmg/{z}/{x}/{y}'
                        ),
                        {
                            code: 'T',
                            isOverlay: false,
                            scaleDependent: false,
                            maxNativeZoom: 13,
                            noCors: false,
                            print: true,
                            jnx: true,
                            shortName: 'topomapper_1k',
                            attribution: '<a href="https://play.google.com/store/apps/' +
                                'details?id=com.atlogis.sovietmaps.free&hl=en&gl=US">Russian Topo Maps</a>',
                        }
                    )
                },

                {
                    title: 'Topo 10km',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/topo001m/{z}/{x}/{y}",
                        {
                            code: 'D',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 10,
                            print: true,
                            jnx: true,
                            shortName: 'topo_10k'
                        }
                    )
                },
                {
                    title: 'GGC 2 km',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/ggc2000/{z}/{x}/{y}",
                        {
                            code: 'N',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 12,
                            print: true,
                            jnx: true,
                            shortName: 'ggc_2k'
                        }
                    )
                },
                {
                    title: 'ArbaletMO',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/ArbaletMO/{z}/{x}/{y}",
                        {
                            code: 'A',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 13,
                            print: true,
                            jnx: true,
                            shortName: 'arbalet',
                            attribution:
                                '<a href="http://www.velozona.ru/forums/showmessage.php?id=3370">Arbalet (2004)</a>',
                        }
                    )
                },
                {
                    title: 'Slazav mountains',
                    isDefault: true,
                    layer: L.tileLayer("https://tiles.sikmir.ru/services/hr/tiles/{z}/{x}/{y}.png",
                        {
                            code: 'Q',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            scaleDependent: false,
                            maxNativeZoom: 13,
                            noCors: true,
                            print: true,
                            jnx: true,
                            shortName: 'slazav_mountains',
                            attribution: '<a href="http://slazav.xyz/maps">Vladislav Zavjalov</a>',
                        }
                    )
                },
                {
                    title: 'GGC 1km',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/ggc1000/{z}/{x}/{y}",
                        {
                            code: 'J',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 13,
                            print: true,
                            jnx: true,
                            shortName: 'ggc_1k'
                        }
                    )
                },
                {
                    title: 'Topo 1km',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/topo1000/{z}/{x}/{y}",
                        {
                            code: 'C',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 13,
                            print: true,
                            jnx: true,
                            shortName: 'topo_1k'
                        }
                    )
                },
                {
                    title: 'GGC 500m',
                    isDefault: true,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/ggc500/{z}/{x}/{y}",
                        {
                            code: 'F',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 14,
                            print: true,
                            jnx: true,
                            shortName: 'ggc_500'
                        }
                    )
                },
                {
                    title: 'Topo 500m',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/topo500/{z}/{x}/{y}",
                        {
                            code: 'B',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 14,
                            print: true,
                            jnx: true,
                            shortName: 'topo_500'
                        }
                    )
                },
                {
                    title: 'GGC 250m',
                    isDefault: true,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/ggc250/{z}/{x}/{y}",
                        {
                            code: 'K',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 15,
                            print: true,
                            jnx: true,
                            shortName: 'ggc_250'
                        }
                    )
                },
                {
                    title: 'Slazav Moscow region map',
                    isDefault: true,
                    layer: L.tileLayer("https://tiles.sikmir.ru/services/podm/tiles/{z}/{x}/{y}.png",
                        {
                            code: 'Z',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            scaleDependent: false,
                            maxNativeZoom: 14,
                            noCors: true,
                            print: true,
                            jnx: true,
                            shortName: 'slazav',
                            attribution: '<a href="http://slazav.xyz/maps">Vladislav Zavjalov</a>',
                        }
                    )
                },
                {
                    title: 'Races',
                    isDefault: true,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/adraces/{z}/{x}/{y}",
                        {
                            code: 'U',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 15,
                            print: true,
                            jnx: true,
                            shortName: 'races'
                        }
                    )
                },
                {
                    title: 'O-sport',
                    isDefault: true,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/osport/{z}/{x}/{y}",
                        {
                            code: 'R',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 17,
                            print: true,
                            jnx: true,
                            shortName: 'osport'
                        }
                    )
                },
                {
                    title: 'Soviet topo maps grid',
                    isDefault: false,
                    layer: new L.Layer.SovietTopoGrid({
                        code: 'Ng',
                        isOverlay: true,
                        print: false,
                        jnx: false
                    })
                },
                {
                    title: 'Wikimapia',
                    isDefault: true,
                    layer: new L.Wikimapia({
                        code: 'W',
                        isOverlay: true,
                        print: false,
                        jnx: false,
                        attribution: '<a href="https://wikimapia.org/">Wikimapia</a>',
                        tilesBaseUrl: config.wikimapiaTilesBaseUrl,
                    })
                },
                {
                    title: 'Mountain passes (Westra)',
                    isDefault: true,
                    layer: new L.Layer.WestraPasses(config.westraDataBaseUrl, {
                        code: 'Wp',
                        print: true,
                        jnx: false,
                        scaleDependent: true,
                        isOverlay: true,
                        isOverlayTransparent: true,
                        shortName: 'passes',
                        markersOptions: {
                            isOverlay: true,
                            isOverlayTransparent: true,
                            shortName: 'passes'
                        },
                        attribution: '<a href="http://westra.ru/passes/">Westra passes catalog</a>',
                    })
                },
                {
                    title: 'OpenTopoMap',
                    isDefault: true,
                    layer: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
                        {
                            code: 'Otm',
                            isOverlay: false,
                            maxNativeZoom: 15,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            noCors: false,
                            shortName: 'opentopo',
                            attribution: '<a href="https://opentopomap.org/">OpenTopoMap</a>',
                            hotkey: 'V',
                        }
                    )
                },
                {
                    title: 'OpenTopoMap.cz',
                    isDefault: true,
                    layer: L.tileLayer('https://tile-{s}.opentopomap.cz/{z}/{x}/{y}.png',
                        {
                            code: 'Otmcz',
                            isOverlay: false,
                            maxNativeZoom: 18,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            noCors: false,
                            shortName: 'opentopocz',
                            attribution: '<a href="https://opentopomap.cz/">OpenTopoMap.cz</a>',
                        }
                    )
                },
                {
                    title: 'OpenRailwayMap',
                    isDefault: true,
                    layer: L.tileLayer('http://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
                        {
                            code: 'Orm',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                            print: true,
                            jnx: false,
                            shortName: 'orm',
                            attribution: '<a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>',
                        }
                    )
                },
                {
                    title: 'OpenCycleMap',
                    description: '<a href="https://www.opencyclemap.org/docs/">(Info and key)</a>',
                    isDefault: true,
                    layer: new RetinaTileLayer(
                        [
                            `https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${config.thunderforestKey}`, // eslint-disable-line max-len
                            `https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}@2x.png?apikey=${config.thunderforestKey}`, // eslint-disable-line max-len
                        ],
                        {
                            code: 'Ocm',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'opencyclemap',
                            attribution: '<a href="https://www.opencyclemap.org/">Thunderforest OpenCycleMap</a>',
                        }
                    )
                },
                {
                    title: 'OSM Outdoors',
                    isDefault: true,
                    layer: new RetinaTileLayer(
                        [
                            `https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${config.thunderforestKey}`, // eslint-disable-line max-len
                            `https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}@2x.png?apikey=${config.thunderforestKey}`, // eslint-disable-line max-len
                        ],
                        {
                            code: 'Oso',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'osm_outdoors',
                            attribution:
                                '<a href="https://www.thunderforest.com/maps/outdoors/">Thunderforest Outdoors</a>',
                        }
                    )
                },
                {
                    title: 'Eurasia 25km',
                    description: '1975-80',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/eurasia25km/{z}/{x}/{y}",
                        {
                            code: 'E25m',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            maxNativeZoom: 9,
                            print: true,
                            jnx: true,
                            scaleDependent: false,
                            shortName: 'eurasia_25k'
                        }
                    )
                },
                {
                    title: 'Caucasus 1km',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/new_gsh_100k/{z}/{x}/{y}",
                        {
                            code: 'NT1',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            maxNativeZoom: 14,
                            print: true,
                            jnx: true,
                            scaleDependent: false,
                            shortName: 'caucasus_1k',
                            attribution: '<a href="http://genshtab-yuga.narod.ru/">Topo maps (2006)</a>',
                        }
                    )
                },
                {
                    title: 'Caucasus 500m',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/new_gsh_050k/{z}/{x}/{y}",
                        {
                            code: 'NT5',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            maxNativeZoom: 15,
                            print: true,
                            jnx: true,
                            scaleDependent: false,
                            shortName: 'caucasus_500',
                            attribution: '<a href="http://genshtab-yuga.narod.ru/">Topo maps (1998 - 2003)</a>',
                        }
                    )
                },
                {
                    title: 'Topo 250m',
                    isDefault: true,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/topo250/{z}/{x}/{y}",
                        {
                            code: 'T25',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            maxNativeZoom: 15,
                            print: true,
                            jnx: true,
                            scaleDependent: false,
                            shortName: 'topo_250'
                        }
                    )
                },
                {
                    title: 'Montenegro topo 250m',
                    description: '1970-72',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/montenegro250m/{z}/{x}/{y}",
                        {
                            code: 'MN25',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            maxNativeZoom: 15,
                            print: true,
                            jnx: true,
                            scaleDependent: false,
                            shortName: 'montenegro_250'
                        }
                    )
                },
                {
                    title: 'Mountains by Aleksey Tsvetkov',
                    description:
                        'Tian Shan, Dzungaria, <a href="http://pereval.g-utka.ru/">http://pereval.g-utka.ru/</a>',
                    isDefault: true,
                    layer: new LayerGroupWithOptions(
                        [
                            L.tileLayer(
                                urlViaCorsProxy(
                                    'http://nakartetiles.s3-website.eu-central-1.amazonaws.com/{z}/{x}/{y}.png'
                                ),
                                {
                                    isOverlay: true,
                                    isOverlayTransparent: false,
                                    tms: false,
                                    minZoom: 2,
                                    maxNativeZoom: 15,
                                    print: true,
                                    jnx: true,
                                    scaleDependent: false,
                                    noCors: false,
                                    shortName: 'tsvetkov_mountains',
                                    cutline: getCutline('tsvetkov_mountains'),
                                    bounds: [
                                        [40.66664, 71.00007],
                                        [45.33338, 81.00001],
                                    ],
                                    attribution: '<a href="http://pereval.g-utka.ru/">Aleksey Tsvetkov</a>',
                                }
                            ),
                            new LayerCutlineOverview(getCutline('tsvetkov_mountains'), 6,
                                'Mountains by Aleksey Tsvetkov'),
                        ],
                        {
                            code: 'Mt',
                            isOverlay: true,
                            isWrapper: true,
                        }
                    ),
                },
                {
                    title: 'geocaching.su',
                    isDefault: true,
                    layer: new GeocachingSu(config.geocachingSuUrl, {
                        code: 'Gc',
                        isOverlay: true,
                        isOverlayTransparent: true,
                        print: true,
                        jnx: false,
                        shortName: 'geocaching',
                        attribution: '<a href="https://geocaching.su/">geocaching.su</a>',
                    })
                },
                {
                    title: 'OpenStreetMap GPS traces',
                    isDefault: true,
                    layer: L.tileLayer('https://{s}.gps-tile.openstreetmap.org/lines/{z}/{x}/{y}.png',
                        {
                            code: 'Ot',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                            print: true,
                            jnx: false,
                            shortName: 'osm_gps_traces',
                            attribution: '<a href="https://www.openstreetmap.org/#&layers=G">' +
                                'OpenStreetMap public GPS traces</a>',
                        }
                    )
                },
                {
                    title: 'Strava heatmap (all)',
                    isDefault: true,
                    layer: new RetinaTileLayer(
                        [
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/all/hot/{z}/{x}/{y}.png?px=256'
                            ),
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/all/hot/{z}/{x}/{y}.png?px=512'
                            ),
                        ],
                        {
                            code: 'Sa',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: false,
                            print: true,
                            jnx: false,
                            subdomains: 'abc',
                            noCors: false,
                            shortName: 'strava_all',
                            retinaOptionsOverrides: [{maxNativeZoom: 16}, {maxNativeZoom: 15}],
                            attribution: '<a href="https://www.strava.com/heatmap">Strava Global Heatmap</a>',
                            opacity: 0.75,
                        }
                    )
                },
                {
                    title: 'Strava heatmap (run)',
                    isDefault: false,
                    layer: new RetinaTileLayer(
                        [
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/run/hot/{z}/{x}/{y}.png?px=256'
                            ),
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/run/hot/{z}/{x}/{y}.png?px=512'
                            ),
                        ],
                        {
                            code: 'Sr',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: false,
                            print: true,
                            jnx: false,
                            subdomains: 'abc',
                            noCors: false,
                            shortName: 'strava_run',
                            retinaOptionsOverrides: [{maxNativeZoom: 16}, {maxNativeZoom: 15}],
                            attribution: '<a href="https://www.strava.com/heatmap">Strava Global Heatmap</a>',
                            opacity: 0.75,
                        }
                    )
                },
                {
                    title: 'Strava heatmap (ride)',
                    isDefault: false,
                    layer: new RetinaTileLayer(
                        [
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/ride/hot/{z}/{x}/{y}.png?px=256'
                            ),
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/ride/hot/{z}/{x}/{y}.png?px=512'
                            ),
                        ],
                        {
                            code: 'Sb',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: false,
                            print: true,
                            jnx: false,
                            subdomains: 'abc',
                            noCors: false,
                            shortName: 'strava_ride',
                            retinaOptionsOverrides: [{maxNativeZoom: 16}, {maxNativeZoom: 15}],
                            attribution: '<a href="https://www.strava.com/heatmap">Strava Global Heatmap</a>',
                            opacity: 0.75,
                        }
                    )
                },
                {
                    title: 'Strava heatmap (winter)',
                    isDefault: false,
                    layer: new RetinaTileLayer(
                        [
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/winter/hot/{z}/{x}/{y}.png?px=256'
                            ),
                            urlViaCorsProxy(
                                'https://content-a.strava.com/identified/globalheat/winter/hot/{z}/{x}/{y}.png?px=512'
                            ),
                        ],
                        {
                            code: 'Sw',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: false,
                            print: true,
                            jnx: false,
                            subdomains: 'abc',
                            noCors: false,
                            shortName: 'strava_winter',
                            retinaOptionsOverrides: [{maxNativeZoom: 16}, {maxNativeZoom: 15}],
                            attribution: '<a href="https://www.strava.com/heatmap">Strava Global Heatmap</a>',
                            opacity: 0.75,
                        }
                    )
                },
                {
                    title: 'Norway paper map',
                    isDefault: false,
                    layer: new L.TileLayer(
                        'https://cache.kartverket.no/v1/wmts/1.0.0/toporaster/default/webmercator/{z}/{y}/{x}.png',
                        {
                            code: 'Np',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: false,
                            shortName: 'norway_paper',
                            bounds: [[57.81324, 4.19674], [71.27961, 31.56094]],
                            attribution: '<a href="https://kartverket.no/til-lands/kart/turkart">Kartverket</a>',
                        }
                    )
                },
                {
                    title: 'Norway topo',
                    isDefault: false,
                    layer: new L.TileLayer(
                        'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png',
                        {
                            code: 'Nm',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: false,
                            shortName: 'norway_topo',
                            bounds: [[57.81324, 4.19674], [71.27961, 31.56094]],
                            attribution: '<a href="https://kartverket.no/til-lands/kart/turkart">Kartverket</a>',
                        }
                    )
                },
                {
                    // Вместо 404 отдают 500 для отсутствующих тайлов
                    title: 'Norway roads',
                    description: '<a href="https://kart.finn.no/">https://kart.finn.no/</a>',
                    isDefault: false,
                    layer: L.tileLayer("https://maptiles1.finncdn.no/tileService/1.0.3/normap/{z}/{x}/{y}.png",
                        {
                            code: 'Nr',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: false,
                            shortName: 'norway_roads',
                            bounds: [[57.81324, 4.19674], [71.27961, 31.56094]],
                            cutline: getCutline('norway'),
                            attribution: '<a href="https://kart.finn.no/">finn.no</a>',
                        }
                    )
                },
                {
                    title: 'mapy.cz tourist',
                    isDefault: true,
                    layer: new RetinaTileLayer(
                        [
                            'https://proxy.nakarte.me/mapy/turist-en/{z}-{x}-{y}',
                            'https://proxy.nakarte.me/mapy/turist-en/retina/{z}-{x}-{y}',
                        ],
                        {
                            code: 'Czt',
                            isOverlay: false,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            shortName: 'czech_tourist',
                            hotkey: 'H',
                            attribution: '<a href="https://mapy.cz/turisticka">mapy.cz outdoor map</a>',
                        }
                    )
                },
                {
                    title: 'mapy.cz winter',
                    isDefault: false,
                    layer: new LayerGroupWithOptions([
                        new L.TileLayer('https://proxy.nakarte.me/mapy/winter-en-down/{z}-{x}-{y}', {
                            tms: false,
                            print: true,
                            isOverlay: false,
                            jnx: true,
                            scaleDependent: true,
                            shortName: 'czech_winter',
                        }),
                        new L.TileLayer('https://proxy.nakarte.me/mapy/winter-en-up/{z}-{x}-{y}', {
                            tms: false,
                            print: true,
                            jnx: false,
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                        }),
                    ], {
                        code: 'Czw',
                        isOverlay: false,
                        isWrapper: true,
                        attribution: '<a href="https://mapy.cz/zimni">mapy.cz winter map</a>',
                    }),
                },
                {
                    title: 'Finland Topo',
                    description: '<a href="https://laji.fi/en/map/">LAJI.FI</a>',
                    isDefault: true,
                    layer: L.tileLayer(
                        "https://proxy.laji.fi/mml_wmts/maasto/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/" +
                        "{z}/{y}/{x}.png",
                        {
                            code: 'Fmk',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: false,
                            shortName: 'finland_topo',
                            bound: [[59.45416, 19.08321], [70.09211, 31.58671]],
                            cutline: getCutline('finland'),
                            attribution: '<a href="https://laji.fi/en/map/">LAJI.FI</a>',
                        }
                    )
                },
                {
                    title: 'Pitäjänkartta 200m',
                    description: '<a href="http://www.karjalankartat.fi/">http://www.karjalankartat.fi/</a>',
                    isDefault: true,
                    layer: L.tileLayer.wms(
                        `https://mapservices.navici.com/karjalankartat/wms?apikey=${config.karjalankarttaKey}`,
                        {
                            code: 'Pkk20',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            layers: 'pitaja20k_group',
                            crs: L.CRS.EPSG3857,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: true,
                            shortName: 'kk_pitaja20k',
                            bound: [[59.86137, 28.20190], [62.34706, 33.08533]],
                            attribution: '<a href="https://www.karjalankartat.fi/">karjalankartat.fi</a>',
                        }
                    )
                },
                {
                    title: 'Karjalankartta 200m',
                    description: '<a href="http://www.karjalankartat.fi/">http://www.karjalankartat.fi/</a>',
                    isDefault: true,
                    layer: L.tileLayer.wms(
                        `https://mapservices.navici.com/karjalankartat/wms?apikey=${config.karjalankarttaKey}`,
                        {
                            code: 'Fkk20',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            layers: 'topo20k_group',
                            crs: L.CRS.EPSG3857,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: true,
                            shortName: 'kk_topo20k',
                            bound: [[59.86137, 28.20190], [62.34706, 33.08533]],
                            attribution: '<a href="https://www.karjalankartat.fi/">karjalankartat.fi</a>',
                        }
                    )
                },
                {
                    title: 'Karjalankartta 1km',
                    description: '<a href="http://www.karjalankartat.fi/">http://www.karjalankartat.fi/</a>',
                    isDefault: true,
                    layer: L.tileLayer.wms(
                        `https://mapservices.navici.com/karjalankartat/wms?apikey=${config.karjalankarttaKey}`,
                        {
                            code: 'Fkk100',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            layers: 'topo100k_group',
                            crs: L.CRS.EPSG3857,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            noCors: true,
                            shortName: 'kk_topo100k',
                            bound: [[59.80616, 28.30078], [63.56078, 33.57971]],
                            attribution: '<a href="https://www.karjalankartat.fi/">karjalankartat.fi</a>',
                        }
                    )
                },
                {
                    title: 'Great Britain Topo (out of order)',
                    disabled: true,
                    isDefault: false,
                    layer: new LayerGroupWithOptions(
                        [
                            new BingOrdnanceSurveyLayer({
                                minZoom: 12,
                                maxNativeZoom: 16,
                                bounds: [
                                    [49.83793, -7.75643],
                                    [60.87164, 1.82356],
                                ],
                                isOverlay: true,
                                isOverlayTransparent: false,
                                scaleDependent: true,
                                print: true,
                                jnx: true,
                                shortName: 'england_topo',
                                cutline: getCutline('great_britain'),
                                attribution: '<a href="https://docs.microsoft.com/en-us/bingmaps/v8-web-control/' +
                                    'map-control-api/maptypeid-enumeration">Ordnance Survey</a>',
                            }),
                            new LayerCutlineOverview(getCutline('great_britain'), 11, 'Great Britain Topo (zoom ≥ 12)'),
                        ],
                        {
                            code: 'Gbt',
                            isOverlay: true,
                            isWrapper: true,
                            maxZoom: -1,
                        }
                    ),
                },
                {
                    title: 'Waymarked Cycling Trails',
                    description:
                        '<a href="https://cycling.waymarkedtrails.org/">https://cycling.waymarkedtrails.org</a>',
                    isDefault: false,
                    layer: L.tileLayer('https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png',
                        {
                            code: 'Wc',
                            isOverlay: true,
                            tms: false,
                            print: true,
                            jnx: false,
                            scaleDependent: true,
                            shortName: 'cycling_trails',
                            isOverlayTransparent: true,
                            attribution: '<a href="https://cycling.waymarkedtrails.org/">Waymarked Cycling Trails</a>',
                        })
                },
                {
                    title: 'Waymarked Hiking Trails',
                    description: '<a href="https://hiking.waymarkedtrails.org/">https://hiking.waymarkedtrails.org</a>',
                    isDefault: false,
                    layer: L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
                        {
                            code: 'Wh',
                            isOverlay: true,
                            tms: false,
                            print: true,
                            jnx: false,
                            scaleDependent: true,
                            shortName: 'hiking_trails',
                            isOverlayTransparent: true,
                            attribution: '<a href="https://hiking.waymarkedtrails.org/">Waymarked Hiking Trails</a>',
                        })
                },
                {
                    title: 'Slovakia topo',
                    description: '<a href="https://mapy.hiking.sk">https://mapy.hiking.sk/</a>',
                    isDefault: false,
                    layer: new LayerGroupWithOptions(
                        [
                            L.tileLayer('https://static.mapy.hiking.sk/topo/{z}/{x}/{y}.png', {
                                isOverlay: true,
                                tms: false,
                                print: true,
                                jnx: true,
                                scaleDependent: true,
                                shortName: 'slovakia_topo',
                                isOverlayTransparent: false,
                                maxNativeZoom: 15,
                                minZoom: 10,
                                bounds: [
                                    [47.5172, 16.74316],
                                    [49.91343, 22.74837],
                                ],
                                noCors: true,
                                cutline: getCutline('slovakia'),
                                attribution: '<a href="https://mapy.hiking.sk/">mapy.hiking.sk</a>',
                            }),
                            new LayerCutlineOverview(getCutline('slovakia'), 9, 'Slovakia topo (zoom ≥ 10)'),
                        ],
                        {
                            code: 'St',
                            isOverlay: true,
                            isWrapper: true,
                        }
                    ),
                },
                {
                    title: 'Spain topo',
                    isDefault: false,
                    layer: L.tileLayer(
                            'https://www.ign.es/wmts/mapa-raster?layer=MTN&style=default&' +
                            'tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&' +
                            'Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
                            {
                                code: 'Sp',
                                isOverlay: true,
                                tms: false,
                                print: true,
                                jnx: true,
                                scaleDependent: true,
                                shortName: 'spain_topo',
                                isOverlayTransparent: false,
                                minZoom: 1,
                                bounds: [[35.9024, -9.51828], [43.8375, 4.50439]],
                                noCors: false,
                                cutline: getCutline('spain'),
                                attribution: '<a href="https://www.ign.es/iberpix2/visor/">' +
                                    'IGN (Spain) topographic map</a>'
                            }
                    )
                },
                {
                    title: 'Switzerland topo',
                    isDefault: false,
                    layer: new RetinaTileLayer(
                        [
                            null,
                            urlViaCorsProxy(
                                'https:///wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/' +
                                '3857/{z}/{x}/{y}.jpeg'
                            ),
                        ],

                        {
                                code: 'Si',
                                isOverlay: true,
                                tms: false,
                                print: true,
                                jnx: true,
                                scaleDependent: true,
                                shortName: 'swiss_topo',
                                isOverlayTransparent: false,
                                bounds: [[45.80269, 5.87352], [47.86445, 10.6847]],
                                noCors: false,
                                maxNativeZoom: 16,
                                tileSize: 128,
                                zoomOffset: 1,
                                cutline: getCutline('switzerland'),
                                attribution: '<a href="https://map.geo.admin.ch/?topic=swisstopo&lang=en&bgLayer=' +
                                    'ch.swisstopo.pixelkarte-farbe&E=2586000.76&N=1202020.96&zoom=1">Swisstopo'
                            }, true
                    )
                },
                {
                    title: 'Mountains by Alexander Purikov',
                    isDefault: false,
                    layer: L.tileLayer("https://{s}.tiles.nakarte.me/purikov/{z}/{x}/{y}",
                        {
                            code: 'Pur',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            tms: true,
                            scaleDependent: false,
                            maxNativeZoom: 14,
                            noCors: false,
                            print: true,
                            jnx: true,
                            shortName: 'purikov_mountains',
                            attribution: '<a href="https://westra.ru/reports/">Alexander Purikov</a>',
                        }
                    )
                },
                {
                    title: 'Sweden topo',
                    isDefault: false,
                    layer: L.tileLayer(
                        'https://minkarta.lantmateriet.se/map/topowebbcache' +
                        '?layer=topowebb&style=default&tilematrixset=3857&Service=WMTS&Request=GetTile&Version=1.0.0' +
                        '&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}',
                        {
                            code: 'Se',
                            isOverlay: true,
                            tms: false,
                            print: true,
                            jnx: true,
                            scaleDependent: true,
                            shortName: 'sweden_topo',
                            isOverlayTransparent: false,
                            minZoom: 0,
                            maxNativeZoom: 17,
                            bounds: [[55.13493, 10.58876], [69.07200, 24.18365]],
                            noCors: false,
                            cutline: getCutline('sweden'),
                            attribution: '<a href="https://minkarta.lantmateriet.se/">' +
                                'Lantmäteriet</a>'
                        }
                    )
                },
                {
                    title: 'Inkatlas Outdoor',
                    isDefault: true,
                    layer: L.tileLayer('https://tile.inkatlas.com/inkatlas/outdoor/{z}/{x}/{y}.png',
                        {
                            code: 'Ink',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'inkatlas',
                            attribution: '<a href="https://inkatlas.com/">Inkatlas</a>',
                        }
                    )
                },
                {
                    title: 'ÖPNVKarte',
                    isDefault: true,
                    layer: L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
                        {
                            code: 'Opnv',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'opnvkarte',
                            attribution: '<a href="https://memomaps.de/">memomaps.de</a>',
                        }
                    )
                },
                {
                    title: 'OpenGeofiction',
                    isDefault: false,
                    layer: L.tileLayer('https://tile.opengeofiction.net/ogf-carto/{z}/{x}/{y}.png',
                        {
                            code: 'Ogf',
                            isOverlay: false,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'ogf',
                            attribution: '<a href="https://opengeofiction.net/copyright">' +
                                '&copy; OpenGeofiction contributors</a>',
                        }
                    )
                },
                {
                    title: 'Sentinel-2 L1C',
                    isDefault: true,
                    layer: L.tileLayer.wms(
                        'https://services.sentinel-hub.com/ogc/wms/cd280189-7c51-45a6-ab05-f96a76067710?showlogo=false',
                        {
                            code: 'Sn',
                            isOverlay: true,
                            isOverlayTransparent: false,
                            layers: '1_TRUE_COLOR',
                            crs: L.CRS.EPSG3857,
                            print: true,
                            jnx: false,
                            scaleDependent: true,
                            noCors: true,
                            shortName: 'sentinel',
                        }
                    )
                },
                {
                    title: 'Extremum tracks',
                    isDefault: true,
                    layer: L.tileLayer('https://layers.extremum.org/v2/selector/tracks/{z}/{x}/{y}.png?' +
                                       'layers=Extremum/LizaAlert/Otklik/Other',
                        {
                            code: 'aT',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                            print: true,
                            jnx: false,
                            shortName: 'extremum_tracks'
                        }
                    )
                },
                {
                    title: 'Tracks by @sikmir (raster)',
                    isDefault: true,
                    layer: new L.Layer.MyTracksRaster(
                        {
                            code: 'Mytr',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                            print: true,
                            jnx: false,
                            shortName: 'my_rtracks'
                        }
                    )
                },
                {
                    title: 'Tracks by @sikmir (vector)',
                    isDefault: true,
                    layer: new L.Layer.MyTracksVector(
                        {
                            code: 'Mytv',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            scaleDependent: true,
                            print: false,
                            jnx: false,
                            shortName: 'my_vtracks'
                        }
                    )
                },
                {
                    title: 'EEKO',
                    isDefault: true,
                    layer: L.tileLayer('https://ngw.fppd.cgkipd.ru/tile/56/{z}/{x}/{y}.png',
                        {
                            code: 'Eeko',
                            isOverlay: true,
                            isOverlayTransparent: true,
                            maxNativeZoom: 14,
                            scaleDependent: true,
                            print: true,
                            jnx: true,
                            shortName: 'eekomap',
                            attribution: '© Единая электронная картографическая основа России'
                        }
                    )
                },
    ];

    const groupsDefs = [
        {
            title: 'Default layers',
            layers: [
                'OpenStreetMap',
                'CyclOSM',
                'ESRI Satellite',
                'Yandex map',
                'Yandex Satellite',
                'Google Map',
                'Google Satellite',
                'Google Terrain',
                'Bing Satellite',
                'Topomapper 1km',
                'Topo 10km',
                'GGC 2 km',
                'ArbaletMO',
                'Mountains by Aleksey Tsvetkov',
                'Slazav mountains',
                'GGC 1km',
                'Topo 1km',
                'GGC 500m',
                'Topo 500m',
                'GGC 250m',
                'EEKO',
                'Slazav Moscow region map',
                'Races',
                'O-sport',
                'Soviet topo maps grid',
                'Wikimapia',
                'Mountain passes (Westra)'
            ],
        },
        {
            title: 'OpenStreetMap alternatives',
            layers: [
                'OpenTopoMap',
                'OpenTopoMap.cz',
                'OpenCycleMap',
                'OSM Outdoors',
                'mapy.cz tourist',
                'mapy.cz winter',
                'Inkatlas Outdoor',
                'ÖPNVKarte',
                'OpenGeofiction',
            ],
        },
        {
            title: 'Topo maps',
            layers: [
                'Eurasia 25km',
                'Caucasus 1km',
                'Caucasus 500m',
                'Topo 250m',
                'Montenegro topo 250m',
                'Finland Topo',
                'Sweden topo',
                'Pitäjänkartta 200m',
                'Karjalankartta 200m',
                'Karjalankartta 1km',
                'Great Britain Topo (out of order)',
                'Slovakia topo',
                'Spain topo',
                'Switzerland topo',
            ],
        },
        {
            title: 'Miscellaneous',
            layers: [
                'Mountains by Alexander Purikov',
                'Google Hybrid',
                'geocaching.su',
                'OpenRailwayMap',
                'Sentinel-2 L1C',
            ]
        },
        {
            title: 'Routes and traces',
            layers: [
                'Waymarked Hiking Trails',
                'Waymarked Cycling Trails',
                'OpenStreetMap GPS traces',
                'Strava heatmap (all)',
                'Strava heatmap (run)',
                'Strava heatmap (ride)',
                'Strava heatmap (winter)',
                'Extremum tracks',
                'Tracks by @sikmir (raster)',
                'Tracks by @sikmir (vector)',
            ],

        },
        {
            title: 'Norway <a href="https://www.ut.no/kart/">https://www.ut.no/kart/</a>',
            layers: [
                'Norway paper map',
                'Norway topo',
                'Norway roads'
            ],

        },
    ];

    const titlesByOrder = [
        // common base layers
        // OSM
        'OpenStreetMap',
        'CyclOSM',
        'OpenTopoMap',
        'OpenTopoMap.cz',
        'OpenCycleMap',
        'OSM Outdoors',
        'mapy.cz tourist',
        'mapy.cz winter',
        'Inkatlas Outdoor',
        'ÖPNVKarte',
        'OpenGeofiction',
        // Satellite
        'ESRI Satellite',
        'Yandex Satellite',
        'Google Satellite',
        'Bing Satellite',
        // Commercial maps
        'Yandex map',
        'Google Map',
        'Google Terrain',
        // Topo maps
        'Topomapper 1km',

        // local base layers

        // map overlays
        '#custom-bottom',
        'Eurasia 25km',
        'Topo 10km',
        'GGC 2 km',
        'ArbaletMO',
        'Norway roads',
        'Norway paper map',
        'Norway topo',
        'Finland Topo',
        'Sweden topo',
        'Pitäjänkartta 200m',
        'Karjalankartta 200m',
        'Karjalankartta 1km',
        'Slovakia topo',
        'Spain topo',
        'Mountains by Alexander Purikov',
        'Mountains by Aleksey Tsvetkov',
        'Slazav mountains',
        'GGC 1km',
        'Topo 1km',
        'Caucasus 1km',
        'Great Britain Topo (out of order)',
        'GGC 500m',
        'Topo 500m',
        'Caucasus 500m',
        'GGC 250m',
        'EEKO',
        'Topo 250m',
        'Montenegro topo 250m',
        'Switzerland topo',
        'Slazav Moscow region map',
        'Races',
        'O-sport',
        'Sentinel-2 L1C',
        '#custom-top',

        // line overlays
        'Google Hybrid',
        'Waymarked Hiking Trails',
        'Waymarked Cycling Trails',
        'OpenStreetMap GPS traces',
        'Strava heatmap (all)',
        'Strava heatmap (run)',
        'Strava heatmap (ride)',
        'Strava heatmap (winter)',
        'Soviet topo maps grid',
        'Wikimapia',
        'OpenRailwayMap',
        'Extremum tracks',
        'Tracks by @sikmir (raster)',
        'Tracks by @sikmir (vector)',

        // point overlays
        'Mountain passes (Westra)',
        'geocaching.su',
    ];

function getLayers() {
    // set metadata
    for (let layer of layersDefs) {
        layer.layer.meta = {title: layer.title};
    }

    // assign order to layers
    const orderByTitle = {};
    for (let i = 0; i < titlesByOrder.length; i++) {
        let title = titlesByOrder[i];
        orderByTitle[title] = i + 1;
    }

    for (let layer of layersDefs) {
        const title = layer.title;
        layer.order = orderByTitle[title];
        if (!layer.order) {
            throw new Error(`Layer title not found in titlesByOrder list: ${title}`);
        }
    }

    // divide layers by groups
    const grouppedLayers = [];
    const layersByTitle = {};
    for (let layer of layersDefs) {
        layersByTitle[layer.title] = layer;
    }
    for (let groupDef of groupsDefs) {
        let group = {group: groupDef.title, layers: []};
        grouppedLayers.push(group);
        for (let title of groupDef.layers) {
            let layer = layersByTitle[title];
            group.layers.push(layer);
        }
    }

    return {
        layers: grouppedLayers,
        customLayersOrder: {
            top: orderByTitle['#custom-top'],
            bottom: orderByTitle['#custom-bottom'],

        }
    };
}

export {getLayers, layersDefs, groupsDefs, titlesByOrder};
