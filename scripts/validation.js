//Show field error
const showFieldError = function(formElement, field, errorMessage) {
  const fieldError = formElement.querySelector(`.${field.id}-error`)
  fieldError.textContent = errorMessage;
  field.classList.add(validObject.inputErrorClass);
}

//Hide field error
const hideFieldError = function(formElement, field) {
  const fieldError = formElement.querySelector(`.${field.id}-error`)
  fieldError.textContent = '';
  field.classList.remove(validObject.inputErrorClass);
}

//Check validity
const isValid = function(formElement, field) {
  if(!field.validity.valid) {
    showFieldError(formElement, field, field.validationMessage);
  }

  else {
    hideFieldError(formElement, field);
  }
}

//Check invalid input
const hasInvalidInput = function(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

//Toggle submit button
const toggleButton = function(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(validObject.inactiveButtonClass);
  }
  else {
    button.classList.remove(validObject.inactiveButtonClass);
  }
}

//Set event listeners
const setEventListeners = function(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validObject.inputSelector));
  const button = formElement.querySelector(validObject.submitButtonSelector);
  toggleButton(inputList, button);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      toggleButton(inputList, button);
      isValid(formElement, inputElement);
    });
  });
}


//Validation validationObject
const enableValidation = function(validObject) {
  const formList = Array.from(document.querySelectorAll(validObject.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('input', function(evt) {
      evt.preventDefault();
    })

    setEventListeners(formElement);
  })
}
