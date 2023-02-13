export class FormValidation {
  constructor(validObject, form) {
    this._form = form;
    this._inputSelector = validObject.inputSelector;
    this._submitButtonSelector = validObject.submitButtonSelector;
    this._inactiveButtonClass = validObject.inactiveButtonClass;
    this._inputErrorClass = validObject.inputErrorClass;
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
    this._button = form.querySelector(this._submitButtonSelector);
  }

  //Show field error
  _showFieldError(inputElement, errorMessage) {
    this.fieldError = this._form.querySelector(`.${inputElement.id}-error`);
    this.fieldError.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  //Hide field error
  _hideFieldError(inputElement) {
    this.fieldError = this._form.querySelector(`.${inputElement.id}-error`);
    this.fieldError.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  //Check validity
  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showFieldError(inputElement, inputElement.validationMessage);
    }

    else {
      this._hideFieldError(inputElement);
    }
  }

  //Check invalid input
  _hasInvalidInput() {
    return this._inputList.some((element) => {
      return !element.validity.valid;
    });
  }

  disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  //Toggle submit button
  toggleButton() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }
    else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _disableButtonAfterReset() {
    setTimeout(() => {
      this.disableButton();
    }, 0);
  }

  removeErrors() {
    this._inputList.forEach((element) => {
      this._hideFieldError(element);
    })
  }

  //Set event listeners
  _setEventListeners() {
    this.toggleButton();
    this._form.addEventListener('reset', () => {
      this._disableButtonAfterReset();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButton();
        this._isValid(inputElement);
      });
    });
  }

  //Validation validObject
  enableValidation() {
    this._setEventListeners();
  }
}
