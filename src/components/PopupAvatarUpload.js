import {Popup} from './Popup.js';

export class PopupAvatarUpload extends Popup {
  constructor(popupSelector, avatarPicSelector, {handleAvatarChange}, loadingText) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._fieldUpload = this._popup.querySelector('.popup__field');
    this._avatarPic = document.querySelector(avatarPicSelector);
    this._changeAvatar = handleAvatarChange;
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originButtonText = this._submitButton.value;
    this._loadingText = loadingText;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setAvatar(src) {
    this._avatarPic.src = src;
  }

  getAvatarSrc() {
    return this._fieldUpload.value;
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
      this._changeAvatar(this.getAvatarSrc());
    })
  }
}
