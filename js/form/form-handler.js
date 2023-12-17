import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';

const price = document.querySelector('#price');
const defaultPricePlaceholder = price.placeholder;
const defaultPrice = price.value;

const adForm = document.querySelector('.ad-form');

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

const onResetForm = () => {
  adForm.reset();
  resetFormValidator();
  resetSlider();
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
};

const sendForm = () => {
  adForm.addEventListener('submit', onSubmitForm);
  adForm.reset();
  resetFormValidator();
  resetSlider();
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
};

const resetForm = () => adForm.addEventListener('reset', onResetForm);

export {sendForm, resetForm};
