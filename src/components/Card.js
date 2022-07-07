
export default class Card {
  constructor(data, constants, userId, {openFn, removeFn, likeFn}) {
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._constants = constants;
    this._userId = userId;

    this._openPopupFn = openFn;
    this._removeFn = removeFn;
    this._likeFn = likeFn;

    this._cardElement = this._getCardElement();
    this._likeElement = this._cardElement.querySelector(this._constants.cardLikeSelector);
    this._likesCountElement = this._cardElement.querySelector(this._constants.cardLikesCountSelector);
    this._trashElement = this._cardElement.querySelector(this._constants.cardTrashSelector);

    if (this._ownerId !== this._userId) {
      this._trashElement.remove();
      this._trashElement = null;
    }

    this.update(data);
  }

  createElement() {
    this._setEventListeners(this._cardElement);

    return this._cardElement;
  }

  update(data) {
    this._likesCountElement.innerText = data.likes.length;

    const like = data.likes.some(l => l._id == this._userId);
    this._updateLikeState(like);
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

    return cardElement;
  }

  _updateLikeState(like) {
    this._like = like;
    if (like) {
      this._likeElement.classList.add(this._constants.cardLikeActiveClass);  
    } else {
      this._likeElement.classList.remove(this._constants.cardLikeActiveClass);  
    }
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
    this._likeFn(!this._like);
  }
}