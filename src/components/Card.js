
export default class Card {
  constructor(data, constants, openPopupFn, userId, removeFn) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._constants = constants;
    this._openPopupFn = openPopupFn;
    this._userId = userId;
    this._removeFn = removeFn;

    this._cardElement = this._getCardElement();
    this._likeElement = this._cardElement.querySelector(this._constants.cardLikeSelector);
    this._likesCountElement = this._cardElement.querySelector(this._constants.cardLikesCountSelector);
    this._trashElement = this._cardElement.querySelector(this._constants.cardTrashSelector);

    if (this._ownerId !== this._userId) {
      this._trashElement.remove();
      this._trashElement = null;
    }
  }

  createElement() {
    this._setEventListeners(this._cardElement);

    return this._cardElement;
  }

  remove() {
    this._cardElement.remove();
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

    this._likesCountElement.innerText = 

    return cardElement;
  }

  _setEventListeners(cardElement) {
    if (this._trashElement) {
      this._trashElement.addEventListener('click', evt => this._onTrashClick(evt));
    }

    this._likeElement.addEventListener('click', evt => this._onLikeClick(evt));

    const cardImageElement = cardElement.querySelector(this._constants.cardImageSelector);
    cardImageElement.addEventListener('click', e => this._openPopupFn());
  }


  _onTrashClick() {
    this._removeFn(this);
  }

  _onLikeClick() {
    this._likeElement.classList.toggle(this._constants.cardLikeActiveClass);
  }
}