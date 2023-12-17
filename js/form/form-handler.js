import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
const defaultPricePlaceholder = document.querySelector('#price').placeholder;
const defaultMinPrice = document.querySelector('#price').min;

const adForm = document.querySelector('.ad-form');

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

const onResetForm = () => {
  resetSlider();
  adForm.reset();
  resetFormValidator();
  document.querySelector('#price').placeholder = defaultPricePlaceholder;
  document.querySelector('#price').min = defaultMinPrice;
};

const sendForm = () => {
  resetSlider();
  adForm.addEventListener('submit', onSubmitForm);
  adForm.reset();
  resetFormValidator();
  document.querySelector('#price').placeholder = defaultPricePlaceholder;
  document.querySelector('#price').min = defaultMinPrice;
};

const resetForm = () => adForm.addEventListener('reset', onResetForm);

export {sendForm, resetForm};
