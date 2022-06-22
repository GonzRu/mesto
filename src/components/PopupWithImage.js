import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._imageElement = this._popupElement.querySelector('.card-details__image');
        this._descriptionElement = this._popupElement.querySelector('.card-details__description');
    }

    open({link, name}) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._descriptionElement.textContent = name;

        super.open();
    }
}