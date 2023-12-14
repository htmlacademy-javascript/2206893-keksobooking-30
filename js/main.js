import {renderAds} from './render-ads/render-data.js';
import {activateForm, deactivateForm} from './form/set-form-state.js';
import {sendForm, resetForm} from './form/form-handler.js';
import {adFormChange, checkErrors} from './form/validate-form.js';


renderAds();
deactivateForm();
activateForm();
adFormChange();
checkErrors();
sendForm();
resetForm();
