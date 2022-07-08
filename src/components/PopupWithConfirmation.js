import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._form = this._popupElement.querySelector('.form');
        this._submitButton = this._popupElement.querySelector('.form__save-btn');
    }

    setSubmitCallback(submitCallback) {
        this._submitCallback = submitCallback;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback();
        });
    }
}