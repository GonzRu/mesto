import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.form');
        this._submitButton = this._popupElement.querySelector('.form__save-btn');
    }

    open(card, cardId) {
        this._card = card;
        this._cardId = cardId;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback({card: this._card, cardId: this._cardId});
        });
    }
}