import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
import {renderDefaultMarkerCoordinates, resetMap} from '../map/render-map.js';
import {renderErrorMessage, renderSuccessMessage, renderGetErrorMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/keksobooking/';
const FILE_TYPES = ['.jpg', '.jpeg', 'png', '.gif', '.webp', '.svg'];
const FIRST_ELEMENT_INDEX = 0;
const DEFAULT_PREVIEW_IMG = 'img/muffin-grey.svg';
const ERROR_TYPE_MESSAGE = 'Неверный формат изображения!';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const adFormHeaderInput = document.querySelector('.ad-form-header__input');
const previewFull = document.querySelector('.ad-form-header__preview img');
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

const showTypeError = () => {
  renderGetErrorMessage(errorTemplate);

  document.querySelector('.error__message').textContent = ERROR_TYPE_MESSAGE;
  document.querySelector('.error__button').remove();
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

const onAdFormHeaderInputClick = () => {
  const file = adFormHeaderInput.files[FIRST_ELEMENT_INDEX];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    previewFull.src = src;
  } else {
    showTypeError();
  }
};

const resetHeaderPreview = () => {
  previewFull.src = DEFAULT_PREVIEW_IMG;
};

const onResetAdForm = (evt) => {
  evt.preventDefault();
  resetAdForm();
  resetHeaderPreview();
};

const sendForm = () => {
  renderDefaultMarkerCoordinates(address);
  adForm.addEventListener('submit', onSubmitForm);
  adFormHeaderInput.addEventListener('change', onAdFormHeaderInputClick);
  resetForm.addEventListener('click', onResetAdForm);
};

export {sendForm};
