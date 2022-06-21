import Popup from "./popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.form');
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => this._submitCallback(evt));
    }

    close() {
        this._form.reset();

        super.close();
    }
}