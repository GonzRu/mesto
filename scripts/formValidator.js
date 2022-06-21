export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._formElement.addEventListener('reset', () => this._resetState());
    this._formElement.addEventListener('open', () => this._resetState());

    this._inputList = this._getInputList();
    this._buttonElement = this._getButtonElement();
    this._setEventListeners();
    this._toggleButtonState();
  }

  _resetState() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  }

  _getButtonElement() {
    return this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };
}