import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.form');
        this._inputs = Array.from(this._form.querySelectorAll('.form__textbox'));
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    close() {
        this._form.reset();

        super.close();
    }

    _getInputValues() {
        return this._inputs.reduce(
            (acc, cur) => {
                acc[cur.name] = cur.value
                return acc;
            },
            {}
        );
    }
}