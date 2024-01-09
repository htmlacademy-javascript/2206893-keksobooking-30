import {isEscapeKey} from '../utils/util.js';

const ALERT_SHOW_TIME = 3000;
const SUCCESS_SHOW_TIME = 7000;

let template;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const createTemplate = (item) => {
  template = item.cloneNode(true);
  document.body.append(template);
};

function closeMessage () {
  template.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onCloseButtonClick () {
  closeMessage();
}

const renderErrorMessage = (item) => {
  createTemplate(item);

  template.querySelector('.error__button').addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderGetErrorMessage = (item, message) => {
  createTemplate(item);

  document.querySelector('.error__message').textContent = message;
  document.querySelector('.error__button').remove();
  document.addEventListener('keydown', onDocumentKeydown);

  setTimeout(() => {
    template.remove();
  }, ALERT_SHOW_TIME);
};

const renderSuccessMessage = (item) => {
  createTemplate(item);

  document.addEventListener('keydown', onDocumentKeydown);

  setTimeout(() => {
    template.remove();
  }, SUCCESS_SHOW_TIME);
};

export {renderErrorMessage, renderSuccessMessage, renderGetErrorMessage};
