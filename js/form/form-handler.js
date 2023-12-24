import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
import {renderDefaultMarkerCoordinates, resetMap} from '../map/render-map.js';

const price = document.querySelector('#price');
const defaultPricePlaceholder = price.placeholder;
const defaultPrice = price.value;
const defaultMinPrice = price.min;

const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

const onResetForm = (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetFormValidator();
  resetSlider();
  resetMap(address);
  price.min = defaultMinPrice;
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
};

const resetForm = () => adForm.addEventListener('reset', onResetForm);

const sendForm = () => {
  adForm.addEventListener('submit', onSubmitForm);
  renderDefaultMarkerCoordinates(address);
  resetForm();
};

export {sendForm};
