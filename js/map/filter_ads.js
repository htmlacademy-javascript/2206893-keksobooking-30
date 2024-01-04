const MAX_ADS_COUNT = 10;
const TYPE_DEFAULT = 'any';
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
const type = document.querySelector('#housing-type');
const price = document.querySelector('#housing-price');
// const rooms = document.querySelector('#housing-rooms');
// const guests = document.querySelector('#housing-guests');
// const features = document.querySelectorAll('.map__checkbox:checked');

const filterAds = (ads) => ads
  .filter(({offer}) => (type.value === TYPE_DEFAULT || offer.type === type.value))
  .filter(({offer}) => (offer.price >= PRICE_TYPE[price.value].min && offer.price <= PRICE_TYPE[price.value].max))
  .slice(0, MAX_ADS_COUNT);

export {filterAds};
