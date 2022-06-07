import { Card } from "./card.js";

const initialCards = [
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

  const cardConstants = {
    cardListSelector: '.cards__list',
    cardTemplateSelector: '#card-template',
    cardSelector: '.card',
    cardImageSelector: '.card__image',
    cardCaptionSelector: '.card__caption',
    cardTrashSelector: '.card__trash',
    cardLikeSelector: '.card__like',
    cardLikeActiveClass: 'card__like_active',
  }

const body = document.querySelector('body');

// Profile
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileButtonElement = document.querySelector('.profile__edit');

// Cards
const cardsListElement = document.querySelector(cardConstants.cardListSelector);
const cardAddButtonElement = document.querySelector('.profile__add-photo');

// Popup: Edit Profile
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupNameElement = profilePopup.querySelector('#edit-profile-form-name');
const profilePopupDescriptionElement = profilePopup.querySelector('#edit-profile-form-description');
const profilePopupCloseBtnElement = profilePopup.querySelector('.popup__close-btn');
const profilePopupFormElement = profilePopup.querySelector('.form');

// Popup: Add Card
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupNameElement = cardPopup.querySelector('#add-card-form-name');
const cardPopupLinkElement = cardPopup.querySelector('#add-card-form-link');
const cardPopupCloseBtnElement = cardPopup.querySelector('.popup__close-btn');
const cardPopupFormElement = cardPopup.querySelector('.form');

// Popup: Card Details
const cardDetailsPopup = document.querySelector('.popup_type_card-details');
const cardDetailsPopupCloseBtnElement = cardDetailsPopup.querySelector('.popup__close-btn');
const cardDetailsPopupImageElement = cardDetailsPopup.querySelector('.card-details__image');
const cardDetailsPopupDescriptionElement = cardDetailsPopup.querySelector('.card-details__description');

initSubscriptions();

initialCards.forEach(renderCard);

function initSubscriptions() {
    profileButtonElement.addEventListener('click', openEditProfilePopup);
    cardAddButtonElement.addEventListener('click', openAddCardPopup);

    profilePopupFormElement.addEventListener('submit', submitEditProfile);
    cardPopupFormElement.addEventListener('submit', submitAddCard);

    profilePopupCloseBtnElement.addEventListener('click', e => closePopup(profilePopup));
    cardPopupCloseBtnElement.addEventListener('click', e => closePopup(cardPopup));
    cardDetailsPopupCloseBtnElement.addEventListener('click', e => closePopup(cardDetailsPopup));

    const initPopupSubscrptions = (popupElement) => {
      popupElement.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('popup')) {
          closePopup(popupElement)
        }
      });
    };
    initPopupSubscrptions(profilePopup);
    initPopupSubscrptions(cardPopup);
    initPopupSubscrptions(cardDetailsPopup);
}

function renderCard(cardData) {
    const card = new Card(cardData, cardConstants);
    const cardElement = card.createElement();

    const cardImageElement = cardElement.querySelector('.card__image');
    cardImageElement.addEventListener('click', e => openCardDetailsPopup(cardData));

    cardsListElement.prepend(cardElement);
}

function openEditProfilePopup() {
    profilePopupNameElement.value = profileNameElement.textContent;
    profilePopupDescriptionElement.value = profileDescriptionElement.textContent;

    openPopup(profilePopup);
}

function openCardDetailsPopup(cardData) {
    cardDetailsPopupImageElement.src = cardData.link;
    cardDetailsPopupImageElement.alt = cardData.name;
    cardDetailsPopupDescriptionElement.textContent = cardData.name;

    openPopup(cardDetailsPopup);
}

function openAddCardPopup() {
    cardPopupFormElement.reset();

    openPopup(cardPopup);
}

function submitEditProfile(e) {
    e.preventDefault();
    
    profileNameElement.textContent = profilePopupNameElement.value;
    profileDescriptionElement.textContent = profilePopupDescriptionElement.value;

    closePopup(profilePopup);
}

function submitAddCard(e) {
    e.preventDefault();
    
    const name = cardPopupNameElement.value;
    const link = cardPopupLinkElement.value;

    const card = {
        name: name,
        link: link
    };

    renderCard(card)

    closePopup(cardPopup);
}

const keyDownHandler = (e) => {
  if (e.key === 'Escape' && keyDownHandler.owner) {
    closePopup(keyDownHandler.owner);
  }
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    body.classList.add('page_fixed');

    keyDownHandler.owner = popupElement;
    document.addEventListener('keydown', keyDownHandler);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    body.classList.remove('page_fixed');

    document.removeEventListener('keydown', keyDownHandler);
}