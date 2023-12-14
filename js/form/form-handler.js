import {validateForm, resetFormValidator} from './validate-form.js';

const adForm = document.querySelector('.ad-form');

const onSubmitForm = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

const onResetForm = () => {
  adForm.reset();
  resetFormValidator();
};

const sendForm = () => {
  adForm.addEventListener('submit', onSubmitForm);
  adForm.reset();
  resetFormValidator();
};

const resetForm = () => adForm.addEventListener('reset', onResetForm);

export {sendForm, resetForm};
