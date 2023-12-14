const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormElements = adForm.childNodes;
const mapFiltersElements = mapFilters.childNodes;

const setElementsState = (elements, state) => {
  elements.forEach((element) => {
    element.disabled = state;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  setElementsState(adFormElements, false);
  setElementsState(mapFiltersElements, false);
};

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  setElementsState(adFormElements, true);
  setElementsState(mapFiltersElements, true);
};

export {activateForm, deactivateForm};
