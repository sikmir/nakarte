import secrets from './secrets';

const config = {
    caption: `
       <a href="https://sikmir.ru">sikmir.ru</a> |
       <a href="https://tiles.sikmir.ru">tiles.sikmir.ru</a>`,
    defaultLocation: [60.0, 30.0],
    defaultZoom: 7,
    googleApiUrl: `https://maps.googleapis.com/maps/api/js?v=3&key=${secrets.google}`,
    westraDataBaseUrl: 'https://nakarte.me/westraPasses/',
    CORSProxyUrl: 'https://proxy.nakarte.me/',
    elevationsServer: 'https://elevation.nakarte.me/',
    wikimediaCommonsCoverageUrl: 'https://tiles.nakarte.me/wikimedia_commons_images/{z}/{x}/{y}',
    geocachingSuUrl: 'https://nakarte.me/geocachingSu/geocaching_su2.json',
    tracksStorageServer: 'https://tracks.sikmir.ru',
    wikimapiaTilesBaseUrl: 'https://proxy.nakarte.me/wikimapia/',
    mapillaryRasterTilesUrl: 'https://mapillary.nakarte.me/{z}/{x}/{y}',
    urlsBypassCORSProxy: [new RegExp('^https://pkk\\.rosreestr\\.ru/', 'u')],
    ...secrets,
};

export default config;
