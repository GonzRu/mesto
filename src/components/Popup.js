export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.body.classList.add('page_fixed');

        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.body.classList.remove('page_fixed');

        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
                this.close();
            }
        });
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
          }
    }
}