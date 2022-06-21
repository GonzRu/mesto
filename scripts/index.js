import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from "./UserInfo.js";
import { initialCards, formConstants, cardConstants, selectors } from "./constants.js";
import '../pages/index.css';

// Profile
const profileButtonElement = document.querySelector(selectors.profile.editButton);
const profilePopupNameElement = document.querySelector(selectors.profile.formName);
const profilePopupDescriptionElement = document.querySelector(selectors.profile.formDescription);

// Cards
const cardAddButtonElement = document.querySelector(selectors.card.addButton);

const cardDetailsPopup = new PopupWithImage(selectors.cardDetails.popup);
const cardPopup = new PopupWithForm(selectors.card.popup, (evt) => submitAddCard(evt));
const profilePopup = new PopupWithForm(selectors.profile.popup, (evt) => submitEditProfile(evt));

const userInfo = new UserInfo({
  nameSelector: selectors.profile.name,
  descriptionSelector: selectors.profile.description
}
);

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

function submitEditProfile({ name, description }) {
  const user = {
    name: name,
    description: description,
  }

  userInfo.setUserInfo(user);

  profilePopup.close();
}

function submitAddCard(data) {
  addCard(data)
  cardPopup.close();
}