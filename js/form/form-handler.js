import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
import {renderDefaultMarkerCoordinates, resetMap} from '../map/render-map.js';
import {renderErrorMessage, renderSuccessMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';
import {onAdFormHeaderInputClick, onAdFormInputClick, resetHeaderPreview, resetPhotoPreview} from './upload-preview.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/keksobooking/';


const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const price = document.querySelector('#price');
const defaultPricePlaceholder = price.placeholder;
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const adForm = document.querySelector('.ad-form');
const resetForm = document.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');
const adFormInput = document.querySelector('.ad-form__input');
const adFormHeaderInput = document.querySelector('.ad-form-header__input');

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
  renderErrorMessage(errorTemplate);
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
  resetHeaderPreview();
  resetPhotoPreview();
};

const sendForm = () => {
  renderDefaultMarkerCoordinates(address);
  adForm.addEventListener('submit', onSubmitForm);
  adFormHeaderInput.addEventListener('change', onAdFormHeaderInputClick);
  adFormInput.addEventListener('change', onAdFormInputClick);
  resetForm.addEventListener('click', onResetAdForm);
};

export {sendForm};
