import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { initialCards, formConstants, cardConstants } from "./constants.js";

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
initValidation();
renderInitialCards();


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

function initValidation() {
  const formList = Array.from(document.querySelectorAll(formConstants.formSelector));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(formConstants, formElement);
    formElement.formValidator = formValidator;
    formValidator.enableValidation();
  });
}

function renderInitialCards() {
  initialCards.forEach(renderCard);
}

function renderCard(cardData) {
  const openPopupFn = () => openCardDetailsPopup(cardData);
  
  const card = new Card(cardData, cardConstants, openPopupFn);
  const cardElement = card.createElement();

  cardsListElement.prepend(cardElement);
}

function openEditProfilePopup() {
  profilePopupNameElement.value = profileNameElement.textContent;
  profilePopupDescriptionElement.value = profileDescriptionElement.textContent;
  
  profilePopupFormElement.formValidator.resetState();

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
  cardPopupFormElement.formValidator.resetState();
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