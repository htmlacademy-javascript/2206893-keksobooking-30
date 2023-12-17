const MAX_PRICE = 100000;
const STEP = 1;

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  hotel: 3000,
  palace: 10000
};

const slider = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const defaultType = type.value;

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: MIN_PRICE[defaultType],
      max: MAX_PRICE
    },
    start: MIN_PRICE[defaultType],
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  slider.noUiSlider.off('update');
  slider.noUiSlider.on('update', () => {
    price.value = slider.noUiSlider.get();
  });
};

const onTypeChange = () => {
  const currentType = type.value;
  slider.noUiSlider.updateOptions({
    range: {
      min: MIN_PRICE[currentType],
      max: MAX_PRICE
    }
  });
};

const onPriceInputChange = () => {
  slider.noUiSlider.set(price.value);
};

const updateSliderByType = () => type.addEventListener('change', onTypeChange);
const updateSliderByPriceInput = () => price.addEventListener('change', onPriceInputChange);

const resetSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: MIN_PRICE[defaultType],
      max: MAX_PRICE
    },
    start: MIN_PRICE[defaultType]
  });
};

export {initSlider, updateSliderByType, updateSliderByPriceInput, resetSlider};
