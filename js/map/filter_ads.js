const MAX_ADS_COUNT = 10;
const DEFAULT = 'any';
const PRICE_TYPE = {
  'any': {
    min: 0,
    max: 100000
  },
  'middle': {
    min: 10000,
    max: 50000
  },
  'low': {
    min: 0,
    max: 10000
  },
  'high': {
    min: 50000,
    max: 100000
  }
};
const filterForm = document.querySelector('.map__filters');
const type = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const rooms = filterForm.querySelector('#housing-rooms');
const guests = filterForm.querySelector('#housing-guests');

const filterAds = (ads, featuresList) => ads
  .filter(({offer}) => (type.value === DEFAULT || offer.type === type.value))
  .filter(({offer}) => (offer.price >= PRICE_TYPE[price.value].min && offer.price <= PRICE_TYPE[price.value].max))
  .filter(({offer}) => (rooms.value === DEFAULT || offer.rooms === Number(rooms.value)))
  .filter(({offer}) => (guests.value === DEFAULT || offer.guests === Number(guests.value)))
  .filter(({offer}) => (
    featuresList.length === 0 || (offer.features && featuresList.every(
      (feature) => offer.features.includes(feature))
    ))
  )
  .slice(0, MAX_ADS_COUNT);

export {filterAds};
