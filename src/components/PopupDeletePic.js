import {Popup} from './Popup.js';

export class PopupDeletePic extends Popup {
  constructor(popupSelector, loadingText) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originButtonText = this._submitButton.value;
    this._loadingText = loadingText;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  loading() {
    this._submitButton.value = this._loadingText;
  }

  endLoading() {
    this._submitButton.value = this._originButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    })
  }
}
