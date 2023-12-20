import {activateForm} from '../form/set-form-state.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const ZOOM = 13;
const DEFAULT_MAP_CENTER = {
  lat: 35.6895,
  lng: 139.75
};

const map = L.map('map-canvas');

const adDefaultMarker = () => {

};

const renderMap = () => {
  map.on('load', () => {
    activateForm();
    adDefaultMarker();
  }).setView(DEFAULT_MAP_CENTER, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

export {renderMap};
