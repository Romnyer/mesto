//Validation object
export const validObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disable',
  inputErrorClass: 'popup__field_type_error'
};


export class FormValidation {
  constructor(validObject, form) {
    this.form = form;
    this.formSelector = validObject.formSelector;
    this.inputSelector = validObject.inputSelector;
    this.submitButtonSelector = validObject.submitButtonSelector;
    this.inactiveButtonClass = validObject.inactiveButtonClass;
    this.inputErrorClass = validObject.inputErrorClass;
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
  _hasInvalidInput(inputList) {
    return inputList.some((element) => {
      return !element.validity.valid;
    });
  }

  //Toggle submit button
  _toggleButton(button, inputList) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this.inactiveButtonClass);
      button.disabled = true;
    }
    else {
      button.classList.remove(this.inactiveButtonClass);
      button.disabled = false;
    }
  }

  //Disable button after form reset
  _disableButtonAfterReset(formElement, button, inputList) {
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        _toggleButton(button, inputList);
      }, 0);
    })
  }

  //Set event listeners
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
    const button = formElement.querySelector(this.submitButtonSelector);
    this._toggleButton(button, inputList);
    this._disableButtonAfterReset(formElement, button, inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButton(button, inputList);
        this._isValid(formElement, inputElement);
      });
    });
  }


  //Validation validObject
  enableValidation() {
    /*
    const formList = Array.from(document.querySelectorAll(this.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('input', (evt) => {
        evt.preventDefault();
      })

      this.setEventListeners(formElement);
    });
    */
    this.form.addEventListener('input', (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners(this.form);
  }

  disableValidation() {
    this.enableValidation = false;
  }
}
