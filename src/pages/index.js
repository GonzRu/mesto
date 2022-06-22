import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import { initialCards, formConstants, cardConstants, selectors } from "../utils/constants.js";
import '../pages/index.css';

// Profile
const profileButtonElement = document.querySelector(selectors.profile.editButton);
const profilePopupNameElement = document.querySelector(selectors.profile.formName);
const profilePopupDescriptionElement = document.querySelector(selectors.profile.formDescription);

// Cards
const cardAddButtonElement = document.querySelector(selectors.card.addButton);

// Popups
const cardDetailsPopup = new PopupWithImage(selectors.cardDetails.popup);
const cardPopup = new PopupWithForm(selectors.card.popup, (evt) => submitAddCard(evt));
const profilePopup = new PopupWithForm(selectors.profile.popup, (evt) => submitEditProfile(evt));

cardPopup.setEventListeners();
cardDetailsPopup.setEventListeners();
profilePopup.setEventListeners();

// UserInfo
const userInfo = new UserInfo({
  nameSelector: selectors.profile.name,
  descriptionSelector: selectors.profile.description
}
);

// Validation
const profileForm = document.forms[selectors.profile.form];
const addCardForm = document.forms[selectors.card.form];
const profileValidation = new FormValidator(formConstants, profileForm);
const newCardValidation = new FormValidator(formConstants, addCardForm);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 

// Section
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => addCard(item)
}, cardConstants.cardListSelector);
cardsSection.generateItems();

initSubscriptions();

function initSubscriptions() {
  profileButtonElement.addEventListener('click', openEditProfilePopup);
  cardAddButtonElement.addEventListener('click', openAddCardPopup);
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

  profileValidation.resetState();
  profilePopup.open();
}

function openAddCardPopup() {
  newCardValidation.resetState();
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