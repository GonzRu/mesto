const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const disableButton = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  const enableButton = (buttonElement, settings) => {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, settings);
    } else {
      enableButton(buttonElement, settings);
    }
  };

  const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
              checkInputValidity(formElement, inputElement, settings);
              toggleButtonState(inputList, buttonElement, settings);
          });
    });
    formElement.addEventListener('reset', _ => disableButton(buttonElement, settings));
  };

  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, settings);
    });
  };

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__textbox',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__textbox_type_error',
    errorClass: 'form__error_visible'
});