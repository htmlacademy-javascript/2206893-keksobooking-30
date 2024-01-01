import {validateForm, resetFormValidator} from './validate-form.js';
import {resetSlider} from './slider-control.js';
import {renderDefaultMarkerCoordinates, resetMap} from '../map/render-map.js';
import {renderErrorMessage, renderSuccessMessage} from '../utils/alert-messages.js';
import {sendData} from '../data-server/api.js';

const POST_DATA_URL = 'https://30.javascript.pages.academy/keksobooking/';

const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const type = document.querySelector('#type');
const defaultType = type.value;
const roomNumber = document.querySelector('#room_number');
const defaultRoomNumber = roomNumber.value;
const capacity = document.querySelector('#capacity');
const defaultCapacity = capacity.value;
const timein = document.querySelector('#timein');
const defaultTimein = timein.value;
const timeout = document.querySelector('#timeout');
const defaultTimeout = timeout.value;
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const defaultPricePlaceholder = price.placeholder;
const defaultPrice = price.value;
const defaultMinPrice = price.min;

const adForm = document.querySelector('.ad-form');
const features = adForm.querySelectorAll('.features__checkbox');
const address = adForm.querySelector('#address');
const title = adForm.querySelector('#title');

const setSubmitButtonStatus = (value) => {
  adForm.disabled = value;
};

const resetFeatures = () => features.forEach(
  (feature) => {
    feature.checked = false;
  });

const resetForm = () => {
  adForm.reset();
  resetFormValidator();
  resetMap(address);
  resetSlider();
  price.min = defaultMinPrice;
  price.placeholder = defaultPricePlaceholder;
  price.value = defaultPrice;
  title.value = '';
  type.value = defaultType;
  roomNumber.value = defaultRoomNumber;
  capacity.value = defaultCapacity;
  timein.value = defaultTimein;
  timeout.value = defaultTimeout;
  description.value = '';
  resetFeatures();
};

const showSuccess = () => {
  renderSuccessMessage(sendSuccessTemplate);
  setSubmitButtonStatus(false);
  resetForm();
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

const onResetForm = (evt) => {
  evt.preventDefault();
  resetForm();
};

const sendForm = () => {
  adForm.addEventListener('submit', onSubmitForm);
  renderDefaultMarkerCoordinates(address);
  adForm.addEventListener('reset', onResetForm);
};

export {sendForm};
