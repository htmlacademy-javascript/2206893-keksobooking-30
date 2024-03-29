import {activateAdForm, activateFilters} from '../form/set-form-state.js';
import {debounce} from '../utils/util.js';
import {renderAd} from '../render-ads/render-data.js';
import {getData} from '../data-server/api.js';
import {renderGetErrorMessage} from '../utils/alert-messages.js';
import {filterAds} from './filter_ads.js';

const ZOOM = 13;
const COORDINATES_ROUND = 5;
const DEFAULT_MAP_CENTER = {
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

const GET_DATA_URL = 'https://30.javascript.pages.academy/keksobooking/data';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ERROR_MESSAGE = 'Ошибка загрузки похожих объявлений';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const filterForm = document.querySelector('.map__filters');

let featuresList = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'), (element) => element.value);
let receivedData;

const map = L.map('map-canvas');

const defaultMarkerIcon = L.icon({
  iconUrl: DEFAULT_ICON_CONFIG.url,
  iconSize: [DEFAULT_ICON_CONFIG.width, DEFAULT_ICON_CONFIG.height],
  iconAnchor: [DEFAULT_ICON_CONFIG.anchorX, DEFAULT_ICON_CONFIG.anchorY],
});

const adMarkerIcon = L.icon({
  iconUrl: AD_ICON_CONFIG.url,
  iconSize: [AD_ICON_CONFIG.width, AD_ICON_CONFIG.height],
  iconAnchor: [AD_ICON_CONFIG.anchorX, AD_ICON_CONFIG.anchorY],
});

const defaultMarker = L.marker(DEFAULT_MAP_CENTER, {
  draggable: true,
  icon: defaultMarkerIcon
}).addTo(map);

const onMoveendDefaultMarker = (evt, input) => {
  const newPosition = evt.target.getLatLng();
  input.value = `${newPosition.lat.toFixed(COORDINATES_ROUND)}, ${newPosition.lng.toFixed(COORDINATES_ROUND)}`;
};

const renderDefaultMarkerCoordinates = (input) => {
  input.value = `${DEFAULT_MAP_CENTER.lat.toFixed(COORDINATES_ROUND)}, ${DEFAULT_MAP_CENTER.lng.toFixed(COORDINATES_ROUND)}`;
  defaultMarker.on('moveend', (evt) => onMoveendDefaultMarker(evt, input));
};

const markersGroup = L.layerGroup().addTo(map);

const renderAdMarker = (ad) => L.marker(ad.location, {
  icon: adMarkerIcon,
}).addTo(markersGroup)
  .bindPopup(renderAd(ad));

const renderAdsMarkers = (ads) => {
  receivedData = ads;
  filterAds(receivedData, featuresList).forEach((ad) => renderAdMarker(ad));
  activateFilters();
};

const filterChange = () => {
  markersGroup.clearLayers();
  featuresList = Array.from(filterForm.querySelectorAll('.map__checkbox:checked'), (element) => element.value);
  filterAds(receivedData, featuresList).forEach((data) => renderAdMarker(data));
};

const onFilterChange = debounce(() => filterChange());

const showError = () => renderGetErrorMessage(errorTemplate, ERROR_MESSAGE);

const initRenderAdsMarkers = () => getData(GET_DATA_URL, renderAdsMarkers, showError);

const renderMap = () => {
  map.on('load', () => {
    activateAdForm();
    initRenderAdsMarkers();
    filterForm.addEventListener('change', onFilterChange);
  }).setView(DEFAULT_MAP_CENTER, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const resetMap = (input) => {
  map.closePopup();
  defaultMarker.setLatLng(DEFAULT_MAP_CENTER);
  map.setView(DEFAULT_MAP_CENTER, ZOOM);
  input.value = `${DEFAULT_MAP_CENTER.lat.toFixed(COORDINATES_ROUND)}, ${DEFAULT_MAP_CENTER.lng.toFixed(COORDINATES_ROUND)}`;
  filterForm.reset();
  filterChange();
};

export {renderMap, renderDefaultMarkerCoordinates, resetMap};
