export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const selectors = {
  profile: {
    popup: '.popup_type_profile',
    formName: '#edit-profile-form-name',
    formDescription: '#edit-profile-form-description',
    name: '.profile__name',
    description: '.profile__description',
    editButton: '.profile__edit',
  },
  card: {
    popup: '.popup_type_card',
    addButton: '.profile__add-photo',
  },
  cardDetails: {
    popup: '.popup_type_card-details',
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