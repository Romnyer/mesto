import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popup, {submitForm}) {
    super(popup);
    this.submitForm = submitForm;
  }

  _getInputValues() {
    this.fieldValues = {};
    this.fields = this.popup.querySelectorAll('.popup__field');

    this.fields.forEach((field) => {
      this.fieldValues[field.name] = field.value;
    });

    return this.fieldValues;
  }

  close() {
    super.close();
    setTimeout(() => {
      this.popup.querySelector('.popup__form').reset();
    },500);
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.close(evt);
    })
  }
}
