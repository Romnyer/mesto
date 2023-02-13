import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup, picLarge, picTitle) {
    super(popup);
    this.pic = document.querySelector(picLarge);
    this.title = document.querySelector(picTitle);
  }

  open(item) {
    super.open();
    this.pic.src = item.link;
    this.pic.alt = item.title;
    this.title.textContent = item.title;
  }
}
