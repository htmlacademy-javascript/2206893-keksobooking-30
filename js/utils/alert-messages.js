import {isEscapeKey} from '../utils/util.js';

const ALERT_SHOW_TIME = 7000;

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
  template.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  template.remove();
}

function onCloseButtonClick () {
  closeMessage();
}

const renderErrorMessage = (item) => {
  createTemplate(item);

  template.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  setTimeout(() => {
    closeMessage();
  }, ALERT_SHOW_TIME);
};

const renderGetErrorMessage = (item, message) => {
  createTemplate(item);

  document.querySelector('.error__message').textContent = message;
  document.querySelector('.error__button').remove();
  template.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const renderSuccessMessage = (item) => {
  createTemplate(item);

  template.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export {renderErrorMessage, renderSuccessMessage, renderGetErrorMessage};
