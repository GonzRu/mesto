
export class Card {
  constructor(data, constants) {
    this._name = data.name;
    this._link = data.link;
    this._constants = constants;
  }

  createElement() {
    const cardElement = this._getCardElement();
    this._setEventListeners(cardElement);

    return cardElement;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._constants.cardTemplateSelector)
      .content
      .querySelector(this._constants.cardSelector)
      .cloneNode(true);

    const cardImageElement = cardElement.querySelector(this._constants.cardImageSelector);
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;

    const cardCaptionElement = cardElement.querySelector(this._constants.cardCaptionSelector);
    cardCaptionElement.textContent = this._name;

    return cardElement;
  }

  _setEventListeners(cardElement) {
    const trashElement = cardElement.querySelector(this._constants.cardTrashSelector);
    trashElement.addEventListener('click', evt => this._onTrashClick(evt));

    const likeElement = cardElement.querySelector(this._constants.cardLikeSelector);
    likeElement.addEventListener('click', evt => this._onLikeClick(evt));
  }


  _onTrashClick(evt) {
    evt.target.closest(this._constants.cardSelector).remove()
  }

  _onLikeClick(evt) {
    evt.target.classList.toggle(this._constants.cardLikeActiveClass);
  }
}