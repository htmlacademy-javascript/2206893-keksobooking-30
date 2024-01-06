import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
import {renderDefaultMarkerCoordinates, resetMap} from '../map/render-map.js';
import {renderErrorMessage, renderSuccessMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/keksobooking/';

const price = document.querySelector('#price');
const defaultPricePlaceholder = price.placeholder;
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const adForm = document.querySelector('.ad-form');
const resetForm = document.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');

const setSubmitButtonStatus = (value) => {
  adForm.disabled = value;
};

const resetAdForm = () => {
  adForm.reset();
  price.placeholder = defaultPricePlaceholder;
  resetFormValidator();
  resetMap(address);
  resetSlider();
};

const showSuccess = () => {
  renderSuccessMessage(sendSuccessTemplate);
  setSubmitButtonStatus(false);
  resetAdForm();
};

const showError = () => {
  renderErrorMessage(sendErrorTemplate);
  setSubmitButtonStatus(false);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (validateForm()) {
    setSubmitButtonStatus(true);
    sendData(POST_DATA_URL, showSuccess, showError, new FormData(evt.target));
  }
};

const onResetAdForm = (evt) => {
  evt.preventDefault();
  resetAdForm();
};

const sendForm = () => {
  renderDefaultMarkerCoordinates(address);
  adForm.addEventListener('submit', onSubmitForm);
  resetForm.addEventListener('click', onResetAdForm);
};

export {sendForm};
