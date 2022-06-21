import Popup from "./popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.form');
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', () => {
            const data = this._getInputValues().reduce(
                (acc, cur) => {
                    acc[cur.name] = cur.value
                    return acc;
                },
                {}
            );
            this._submitCallback(data);
        });
    }

    open() {
        this._form.dispatchEvent(new CustomEvent('open'));
        super.open();
    }

    close() {
        this._form.reset();

        super.close();
    }

    _getInputValues() {
        return Array.from(this._form.querySelectorAll('.form__textbox'));
    }
}