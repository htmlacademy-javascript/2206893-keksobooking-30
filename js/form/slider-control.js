import {validatePrice} from './validate-form.js';

const MAX_PRICE = 100000;
const STEP = 1;

const MIN_PRICE = 0;

const slider = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: MIN_PRICE,
      max: MAX_PRICE
    },
    start: MIN_PRICE,
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  slider.noUiSlider.off('slide');
  slider.noUiSlider.on('slide', () => {
    price.value = slider.noUiSlider.get();
    validatePrice();
  });
};

const onPriceInputChange = () => {
  slider.noUiSlider.set(price.value);
};

const updateSliderByPriceInput = () => price.addEventListener('input', onPriceInputChange);
const resetSlider = () => slider.noUiSlider.reset();

export {initSlider, updateSliderByPriceInput, resetSlider};
