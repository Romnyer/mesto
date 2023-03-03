import {Popup} from './Popup.js';

export class PopupDeletePic extends Popup {
  constructor(popupSelector, loadingText) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this.deleteCard = this.deleteCard.bind(this);
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originButtonText = this._submitButton.value;
    this._loadingText = loadingText;
  }

  open(deleteCardfromServer) {
    super.open();
    this.setEventListeners(deleteCardfromServer);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', (evt) => {
      this.deleteCard(evt);
    })
  }

  deleteCard(deleteCardfromServer) {
    deleteCardfromServer();
  }

  loading() {
    this._submitButton.value = this._loadingText;
  }

  endLoading() {
    this._submitButton.value = this._originButtonText;
  }

  setEventListeners(deleteCardfromServer) {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.deleteCard(deleteCardfromServer);
    })
  }
}
