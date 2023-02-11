import {esc} from './constants.js';

export class Popup {
  constructor(popup) {
    this.popup = popup;
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
      if (evt.key === esc) {
        this.close();
      }
  }

  setEventListeners() {
    this.popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });

    this.popup.addEventListener('click', (evt) => {
      if (evt.target === this.popup) {
        this.close();
      }
    })
  }
}
