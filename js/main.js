const ANNOUNCEMENT_COUNT = 10;
const BASE_IMG_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/';
const AVATAR_ID = {
  min: 1,
  max: 10
};
const PRICE = {
  min: 1,
  max: 100000
};
const PHOTOS_COUNT = {
  min: 1,
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
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const FEATURES = [
  'wifi',
  'flat',
  'parkin',
  'washer',
  'elevator',
  'conditioner'
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
const PHOTOS = [
  'duonguyen-8LrGtIxxa4w.jpg',
  'brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'claire-rendall-b6kAwr1i0Iw.jpg'
];
const TITLE = [
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

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
const getRandomAvatar = () => {
  const avatar = getRandomInteger(AVATAR_ID.min, AVATAR_ID.max)
  if (avatar < 10) {
    return `img/avatars/user0${avatar}.png`
  }
  return `img/avatars/user${avatar}.png`
};

const generatePhotos = () => {
  const photos = Array.from({length: getRandomInteger(PHOTOS_COUNT.min, PHOTOS_COUNT.max)}, () => `${BASE_IMG_URL}${getRandomArrayElement(PHOTOS)}`);
  return Array.from(new Set(photos));
};

const generateAnnouncement = () => ({
  'author': {
    'avatar': getRandomAvatar()
  },
  'offer': {
    'title': getRandomArrayElement(TITLE),
    'address': '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
    'price': getRandomInteger(PRICE.min, PRICE.max),
    'type': getRandomArrayElement(TYPE),
    'rooms': getRandomInteger(ROOMS_COUNT.min, ROOMS_COUNT.max),
    'guests': getRandomInteger(GUESTS_COUNT.min, GUESTS_COUNT.max),
    'checkin': getRandomArrayElement(CHECKIN),
    'checkout': getRandomArrayElement(CHECKOUT),
    'photos': generatePhotos()
  },
  'location': {
    'lat': 35.65935818784681,
    'lng': 139.78305159450522
  }
});

const generateAnnouncements = Array.from({length: ANNOUNCEMENT_COUNT}, generateAnnouncement);

console.log(generateAnnouncements);
