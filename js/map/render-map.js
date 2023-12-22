import {activateForm} from '../form/set-form-state.js';
import {generateAdsData} from '../render-ads/generate-data.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ZOOM = 13;
const COORDINATES_ROUND = 5;
const DEFAULT_MAP_CENTER = {
  lat: 35.6895,
  lng: 139.75
};
const DEFAULT_MARKER_POSITION = {
  lat: 35.683,
  lng: 139.753
};
const DEFAULT_ICON_CONFIG = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const AD_ICON_CONFIG = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const adsData = generateAdsData();
const map = L.map('map-canvas');

const DEFAULT_MARKER_ICON = L.icon({
  iconUrl: DEFAULT_ICON_CONFIG.url,
  iconSize: [DEFAULT_ICON_CONFIG.width, DEFAULT_ICON_CONFIG.height],
  iconAnchor: [DEFAULT_ICON_CONFIG.anchorX, DEFAULT_ICON_CONFIG.anchorY],
});

const defaultMarker = L.marker(DEFAULT_MARKER_POSITION, {
  draggable: true,
  icon: DEFAULT_MARKER_ICON
}).addTo(map);

const onDefaultMarkerMoveend = (evt, input) => {
  const newPosition = evt.target.getLatLng();
  input.value = `${newPosition.lat.toFixed(COORDINATES_ROUND)}, ${newPosition.lng.toFixed(COORDINATES_ROUND)}`;
};

const renderDefaultMarkerCoordinates = (input) => {
  input.value = `${DEFAULT_MARKER_POSITION.lat.toFixed(COORDINATES_ROUND)}, ${DEFAULT_MARKER_POSITION.lng.toFixed(COORDINATES_ROUND)}`;
  defaultMarker.on('moveend', (evt) => onDefaultMarkerMoveend(evt, input));
};

const renderMap = () => {
  map.on('load', () => {
    activateForm();
  }).setView(DEFAULT_MAP_CENTER, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

export {renderMap, renderDefaultMarkerCoordinates};
