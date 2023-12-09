import {getRandomInteger, getRandomNumber, getRandomArrayElement} from '../utils/util.js';

const AD_COUNT = 10;
const BASE_IMG_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';
const PRICE = {
  min: 1,
  max: 100000
};
const PHOTOS_COUNT = {
  min: 0,
  max: 3
};
const GUESTS_COUNT = {
  min: 1,
  max: 20
};
const ROOMS_COUNT = {
  min: 1,
  max: 10
};
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const CHECKIN_HOURS = [
  '12:00',
  '13:00',
  '14:00'
];
const CHECKOUT_HOURS = [
  '12:00',
  '13:00',
  '14:00'
];
const PHOTOS = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg'
];
const TITLES = [
  'Маленькая квартирка рядом с парком',
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Вы захотите тут остаться жить',
  'Тихая квартирка недалеко от метро',
  'Огромный особняк для всей вашей компании'
];
const DESCRIPTIONS = [
  'Маленькая квартирка рядом с парком',
  'Чёткая хата',
  'Небольшая лавочка в парке',
  'Уютное гнездышко для молодоженов',
  'Вы захотите тут остаться жить',
  'Тихая квартирка недалеко от метро',
  'Огромный особняк для всей вашей компании'
];
const LATITUDE = {
  min: 35.65,
  max: 35.7
};
const LONGITUDE = {
  min: 139.7,
  max: 139.8
};

let avatarId = 0;

const getAvatar = (id) => `img/avatars/user${id.toString().padStart(2, '0')}.png`;

const generatePhotos = () => {
  const photos = Array.from({length: getRandomInteger(PHOTOS_COUNT.min, PHOTOS_COUNT.max)}, () => `${BASE_IMG_URL}${getRandomArrayElement(PHOTOS)}`);
  return Array.from(new Set(photos));
};

const generateFeatures = () => {
  const features = Array.from({length: getRandomInteger(0, FEATURES.length)}, () => `${getRandomArrayElement(FEATURES)}`);
  return Array.from(new Set(features));
};

const generateAdData = () => {
  const lat = getRandomNumber(LATITUDE.min, LATITUDE.max);
  const lng = getRandomNumber(LONGITUDE.min, LONGITUDE.max);
  avatarId++;
  return {
    'author': {
      'avatar': getAvatar(avatarId)
    },
    'offer': {
      'title': getRandomArrayElement(TITLES),
      'address': `${lat}, ${lng}`,
      'price': getRandomInteger(PRICE.min, PRICE.max),
      'type': getRandomArrayElement(TYPES),
      'rooms': getRandomInteger(ROOMS_COUNT.min, ROOMS_COUNT.max),
      'guests': getRandomInteger(GUESTS_COUNT.min, GUESTS_COUNT.max),
      'checkin': getRandomArrayElement(CHECKIN_HOURS),
      'checkout': getRandomArrayElement(CHECKOUT_HOURS),
      'features': generateFeatures(),
      'description': getRandomArrayElement(DESCRIPTIONS),
      'photos': generatePhotos()
    },
    'location': {
      'lat': lat,
      'lng': lng
    }
  };
};

const generateAdsData = () => Array.from({length: AD_COUNT}, generateAdData);

export {generateAdsData};
