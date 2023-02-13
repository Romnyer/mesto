import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popup, {submitForm}) {
    super(popup);
    this._submitForm = submitForm;
    this._fields = this._popup.querySelectorAll('.popup__field');
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const fieldValues = {};

    this._fields.forEach((field) => {
      fieldValues[field.name] = field.value;
    });

    return fieldValues;
  }

  close() {
    super.close();
    //Timeout is for saving your text in input's value while popup is closing
    //Other way you will able to see empty inputs after submit
    setTimeout(() => {
      this._form.reset();
    },500);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    })
  }
}
