import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}, loadingText) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._fields = this._popup.querySelectorAll('.popup__field');
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._originButtonText = this._submitButton.value;
    this._loadingText = loadingText;
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
      this._submitForm(this._getInputValues());
    })
  }
}
