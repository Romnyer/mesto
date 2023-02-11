import {picLarge, picTitle} from './constants.js';
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  open({title, link}) {
    super.open();
    picLarge.src = link;
    picLarge.alt = title;
    picTitle.textContent = title;
  }
}
