import {isEscapeKey} from '../utils/util.js';

const ALERT_SHOW_TIME = 3000;

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

function onBodyClick(evt, value) {
  if (evt.target.closest(`.${value}`)) {
    return;
  }
  closeMessage();
}

const renderMessage = (item, value) => {
  createTemplate(item);

  template.querySelector(`.${value}__button`).addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', (evt) => onBodyClick(evt, value));
};

const renderGetErrorMessage = (item) => {
  createTemplate(item);

  setTimeout(() => {
    template.remove();
  }, ALERT_SHOW_TIME);
};

export {renderMessage, renderGetErrorMessage};
