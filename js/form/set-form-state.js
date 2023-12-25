import {initSlider, updateSliderByPriceInput} from './slider-control.js';
import {adFormChange, checkErrors} from './validate-form.js';
import {sendForm} from './form-handler.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormElements = adForm.childNodes;
const mapFiltersElements = mapFilters.childNodes;

const setElementsState = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  setElementsState(adFormElements, false);
  initSlider();
  updateSliderByPriceInput();
  adFormChange();
  checkErrors();
  sendForm();
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setElementsState(mapFiltersElements, false);
};

const deactivateForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setElementsState(adFormElements, true);
  setElementsState(mapFiltersElements, true);
};

export {activateAdForm, activateFilters, deactivateForms};
