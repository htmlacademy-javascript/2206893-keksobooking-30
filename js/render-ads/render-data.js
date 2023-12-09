import {generateAdsData} from './generate-data.js';

const container = document.querySelector('#map-canvas');
const template = document.querySelector('#card').content.querySelector('.popup');

const adsData = generateAdsData();
const fragment = document.createDocumentFragment();

const getOfferType = (type) => {
  switch(type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
};

const renderFeatures = (features, adData) => {
  const featuresList = adData.querySelectorAll('.popup__feature');

  if (features.length === 0) {
    return adData.querySelector('.popup__features').remove();
  }

  featuresList.forEach((element) => {
    if (!features.some((feature) => element.classList.contains(`popup__feature--${feature}`))) {
      element.remove();
    }
  });
};

const renderPhotos = (photos, adData) => {
  const photosContainer = adData.querySelector('.popup__photos');
  const photoTemplate = adData.querySelector('.popup__photo');
  adData.querySelector('.popup__photo').remove();

  if (photos.length === 0) {
    return photosContainer.remove();
  }

  photos.forEach((photo) => {
    const photoClone = photoTemplate.cloneNode(true);
    photoClone.src = photo;
    photosContainer.appendChild(photoClone);
  });
};

const renderAd = (data) => {
  const {author, offer} = data;
  const adData = template.cloneNode(true);

  adData.querySelector('.popup__avatar').src = author.avatar;
  adData.querySelector('.popup__title').textContent = offer.title;
  adData.querySelector('.popup__text--address').textContent = offer.address;
  adData.querySelector('.popup__text--price').textContent = `${offer.price} `;
  adData.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adData.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adData.querySelector('.popup__type').textContent = getOfferType(offer.type);
  renderFeatures(offer.features, adData);
  renderPhotos(offer.photos, adData);

  if (offer.description) {
    adData.querySelector('.popup__description').textContent = offer.description;
  } else {
    adData.querySelector('.popup__description').remove();
  }

  fragment.appendChild(adData);
};

const renderAds = () => {
  renderAd(adsData[0]);

  container.appendChild(fragment);
};

export {renderAds};
