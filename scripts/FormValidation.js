export class FormValidation {
  constructor(validObject, form) {
    this.form = form;
    this.formSelector = validObject.formSelector;
    this.inputSelector = validObject.inputSelector;
    this.submitButtonSelector = validObject.submitButtonSelector;
    this.inactiveButtonClass = validObject.inactiveButtonClass;
    this.inputErrorClass = validObject.inputErrorClass;
    this.inputList = Array.from(form.querySelectorAll(this.inputSelector));
    this.button = form.querySelector(this.submitButtonSelector);
  }

  //Show field error
  _showFieldError(formElement, inputElement, errorMessage) {
    const fieldError = formElement.querySelector(`.${inputElement.id}-error`)
    fieldError.textContent = errorMessage;
    inputElement.classList.add(this.inputErrorClass);
  }

  //Hide field error
  _hideFieldError(formElement, inputElement) {
    const fieldError = formElement.querySelector(`.${inputElement.id}-error`)
    fieldError.textContent = '';
    inputElement.classList.remove(this.inputErrorClass);
  }

  //Check validity
  _isValid(formElement, inputElement) {
    if(!inputElement.validity.valid) {
      this._showFieldError(formElement, inputElement, inputElement.validationMessage);
    }

    else {
      this._hideFieldError(formElement, inputElement);
    }
  }

  //Check invalid input
  _hasInvalidInput() {
    return this.inputList.some((element) => {
      return !element.validity.valid;
    });
  }

  disableButton() {
    this.button.classList.add(this.inactiveButtonClass);
    this.button.disabled = true;
  }

  //Toggle submit button
  toggleButton() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }
    else {
      this.button.classList.remove(this.inactiveButtonClass);
      this.button.disabled = false;
    }
  }

  _disableButtonAfterReset() {
    setTimeout(() => {
      this.disableButton();
    }, 0);
  }

  removeErrors() {
    this.inputList.forEach((element) => {
      this._hideFieldError(this.form, element);
    })
  }

  //Set event listeners
  _setEventListeners(formElement) {
    this.toggleButton();
    formElement.addEventListener('reset', () => {
      this._disableButtonAfterReset();
    });
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButton();
        this._isValid(formElement, inputElement);
      });
    });
  }


  //Validation validObject
  enableValidation() {
    this.form.addEventListener('input', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners(this.form);
  }
}
