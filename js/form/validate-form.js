const TITLE_LENGTH = {
  min: 30,
  max: 100
};

const MAX_PRICE = 100000;

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  hotel: 3000,
  palace: 10000
};

const ROOMS_GUESTS_OPTIONS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const ERROR_LENGTH_TITLE_TEXT = `Заголовок должен быть длиной от ${TITLE_LENGTH.min} до ${TITLE_LENGTH.max} символов`;
const ERROR_MAX_PRICE_TEXT = 'Цена выше максимальной';
const ERROR_MIN_PRICE_TEXT = 'Цена ниже минимальной';
const ERROR_GUESTS_TEXT = 'Количество мест не соответствует количеству комнат';

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomsNumber = adForm.querySelector('#room_number');
const guestsNumber = adForm.querySelector('#capacity');
const checkin = adForm.querySelector('#timein');
const checkout = adForm.querySelector('#timeout');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextClass: 'text-help'
});

const validateTitleLength = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;

const isPriceTooHigh = (value) => value <= MAX_PRICE;
const isPriceTooLow = (value) => value >= MIN_PRICE[type.value];

const validateGuestsNumber = (value) => ROOMS_GUESTS_OPTIONS[roomsNumber.value].includes(value);

const checkErrors = () => {
  pristine.addValidator(title, validateTitleLength, ERROR_LENGTH_TITLE_TEXT, 1, true);
  pristine.addValidator(price, isPriceTooHigh, ERROR_MAX_PRICE_TEXT, 1, true);
  pristine.addValidator(price, isPriceTooLow, ERROR_MIN_PRICE_TEXT, 1, true);
  pristine.addValidator(guestsNumber, validateGuestsNumber, ERROR_GUESTS_TEXT, 1, true);
};

Pristine.setLocale('ru');
Pristine.addMessages('ru', {
  required: 'Это поле обязательно'
});

const validateForm = () => pristine.validate();

const resetFormValidator = () => pristine.reset();

const validatePrice = () => pristine.validate(price);

const onTypeChange = () => {
  price.placeholder = `Минимум ${MIN_PRICE[type.value]}`;
  price.min = MIN_PRICE[type.value];
  validatePrice();
};

const onRoomsGuestsNumberChange = () => {
  pristine.validate(guestsNumber);
};

const onTimeChange = (first, second) => {
  second.value = first.value;
};

const adFormChange = () => {
  type.addEventListener('change', onTypeChange);
  roomsNumber.addEventListener('change', onRoomsGuestsNumberChange);
  guestsNumber.addEventListener('change', onRoomsGuestsNumberChange);
  checkin.addEventListener('change', () => onTimeChange(checkin, checkout));
  checkout.addEventListener('change', () => onTimeChange(checkout, checkin));
};


export {validateForm, adFormChange, checkErrors, resetFormValidator, validatePrice};
