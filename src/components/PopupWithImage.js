import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, picLarge, picTitle) {
    super(popupSelector);
    this._pic = this._popup.querySelector(picLarge);
    this._title = this._popup.querySelector(picTitle);
  }

  open(item) {
    super.open();
    this._pic.src = item.link;
    this._pic.alt = item.title;
    this._title.textContent = item.title;
  }
}
