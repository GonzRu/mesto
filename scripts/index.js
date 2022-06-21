import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from "./userInfo.js";
import { initialCards, formConstants, cardConstants } from "./constants.js";

// Profile
const profileButtonElement = document.querySelector('.profile__edit');
const profilePopupNameElement = document.querySelector('#edit-profile-form-name');
const profilePopupDescriptionElement = document.querySelector('#edit-profile-form-description');

// Cards
const cardAddButtonElement = document.querySelector('.profile__add-photo');

const cardDetailsPopup = new PopupWithImage('.popup_type_card-details');
const cardPopup = new PopupWithForm('.popup_type_card', (evt) => submitAddCard(evt));
const profilePopup = new PopupWithForm('.popup_type_profile', (evt) => submitEditProfile(evt));

const userInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description'});

cardPopup.setEventListeners();
cardDetailsPopup.setEventListeners();
profilePopup.setEventListeners();

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => addCard(item)
}, cardConstants.cardListSelector);

initSubscriptions();
initValidation();
renderInitialCards();


function initSubscriptions() {
  profileButtonElement.addEventListener('click', openEditProfilePopup);
  cardAddButtonElement.addEventListener('click', openAddCardPopup);
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
  cardsSection.generateItems();
}

function addCard(cardData) {
  const cardElement = createCardElement(cardData);
  renderCard(cardElement);
}

function createCardElement(cardData) {
  const openPopupFn = () => cardDetailsPopup.open(cardData);

  const card = new Card(cardData, cardConstants, openPopupFn);
  return card.createElement();
}

function renderCard(cardElement) {
  cardsSection.addItem(cardElement);
}

function openEditProfilePopup() {
  const user = userInfo.getUserInfo();
  profilePopupNameElement.value = user.name;
  profilePopupDescriptionElement.value = user.description;

  profilePopup.open();
}

function openAddCardPopup() {
  cardPopup.open();
}

function submitEditProfile({name, description}) {
  const user = {
    name: name,
    description: description,
  }
  
  userInfo.setUserInfo(user);

  profilePopup.close();
}

function submitAddCard(data) {
  console.log(data);
  addCard(data)
  cardsSection.addItem(data);
  cardPopup.close();
}