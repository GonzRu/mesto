export const selectors = {
  profile: {
    popup: '.popup_type_profile',
    form: 'edit-profile-form',
    formName: '#edit-profile-form-name',
    formDescription: '#edit-profile-form-description',
    name: '.profile__name',
    description: '.profile__description',
    avatar: '.profile__avatar',
    editButton: '.profile__edit',
  },
  newCard: {
    popup: '.popup_type_card',
    form: 'add-card-form',
    addButton: '.profile__add-photo',
  },
  cardDetails: {
    popup: '.popup_type_card-details',
  },
  removeCard: {
    popup: '.popup_type_card-remove'
  }
}

export const cardConstants = {
  cardListSelector: '.cards__list',
  cardTemplateSelector: '#card-template',
  cardSelector: '.card',
  cardImageSelector: '.card__image',
  cardCaptionSelector: '.card__caption',
  cardTrashSelector: '.card__trash',
  cardLikeSelector: '.card__like',
  cardLikesCountSelector: '.card__like-count',
  cardLikeActiveClass: 'card__like_active',
}

export const formConstants = {
  formSelector: '.form',
  inputSelector: '.form__textbox',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__textbox_type_error',
  errorClass: 'form__error_visible'
}