import {renderGetErrorMessage} from '../utils/alert-messages.js';

const FILE_TYPES = ['.jpg', '.jpeg', 'png', '.gif', '.webp', '.svg'];
const DEFAULT_PREVIEW_IMG = 'img/muffin-grey.svg';
const FIRST_ELEMENT_INDEX = 0;
const PREVIEW_SIZE = 70;
const ERROR_TYPE_MESSAGE = 'Неверный формат изображения!';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const adFormHeaderInput = document.querySelector('.ad-form-header__input');
const previewFull = document.querySelector('.ad-form-header__preview img');
const adFormInput = document.querySelector('.ad-form__input');
const photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo').cloneNode(true);
const photosContainer = document.querySelector('.ad-form__photo');

const onAdFormHeaderInputClick = () => {
  const file = adFormHeaderInput.files[FIRST_ELEMENT_INDEX];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    previewFull.src = src;
  } else {
    renderGetErrorMessage(errorTemplate, ERROR_TYPE_MESSAGE);
  }
};

const onAdFormInputClick = () => {
  const file = adFormInput.files[FIRST_ELEMENT_INDEX];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    photoTemplate.src = src;
    photoTemplate.width = PREVIEW_SIZE;
    photoTemplate.height = PREVIEW_SIZE;
    photosContainer.appendChild(photoTemplate);
  } else {
    renderGetErrorMessage(errorTemplate, ERROR_TYPE_MESSAGE);
  }
};

const resetHeaderPreview = () => {
  previewFull.src = DEFAULT_PREVIEW_IMG;
};

const resetPhotoPreview = () => {
  photoTemplate.remove();
};

export {onAdFormHeaderInputClick, onAdFormInputClick, resetHeaderPreview, resetPhotoPreview};
