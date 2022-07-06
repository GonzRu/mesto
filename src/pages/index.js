import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import {formConstants, cardConstants, selectors} from "../utils/constants.js";
import api from '../utils/Api.js';
import '../pages/index.css';

// Profile
const profileButtonElement = document.querySelector(selectors.profile.editButton);
const profilePopupNameElement = document.querySelector(selectors.profile.formName);
const profilePopupDescriptionElement = document.querySelector(selectors.profile.formDescription);

// Cards
const newCardButtonElement = document.querySelector(selectors.newCard.addButton);

// Popups
const cardDetailsPopup = new PopupWithImage(selectors.cardDetails.popup);
const newCardPopup = new PopupWithForm(selectors.newCard.popup, (evt) => submitAddCard(evt));
const removeCardPopup = new PopupWithForm(selectors.removeCard.popup, (evt) => submitRemoveCard(evt));
const profilePopup = new PopupWithForm(selectors.profile.popup, (evt) => submitEditProfile(evt));

newCardPopup.setEventListeners();
cardDetailsPopup.setEventListeners();
removeCardPopup.setEventListeners();
profilePopup.setEventListeners();

// UserInfo
const userInfo = new UserInfo({
        nameSelector: selectors.profile.name,
        descriptionSelector: selectors.profile.description,
        avatarSelector: selectors.profile.avatar,
    }
);

// Validation
const profileForm = document.forms[selectors.profile.form];
const newCardForm = document.forms[selectors.newCard.form];
const profileValidation = new FormValidator(formConstants, profileForm);
const newCardValidation = new FormValidator(formConstants, newCardForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

// Section
let cardsSection = null;

initSubscriptions();

function initSubscriptions() {
    profileButtonElement.addEventListener('click', openEditProfilePopup);
    newCardButtonElement.addEventListener('click', openAddCardPopup);
}

function addCard(cardData) {
    const cardElement = createCardElement(cardData, userInfo.getUserInfo().id);
    renderCard(cardElement);
}

function createCardElement(cardData, userId) {
    const openPopupFn = () => cardDetailsPopup.open(cardData);
    const removeFn = (card) => {
        removeCardPopup.cardId = cardData._id;
        removeCardPopup.card = card;
        removeCardPopup.open();
    }

    const card = new Card(cardData, cardConstants, openPopupFn, userId, removeFn);
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
    newCardPopup.open();
}

function submitEditProfile(data) {
    userInfo.setUserInfo(data);
    profilePopup.close();
}

function submitAddCard(data) {
    newCardPopup.setLoading(true);
    api.createCard(data)
        .then(card => {
            addCard(card);
            newCardPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => newCardPopup.setLoading(false));
}

function submitRemoveCard() {
    const card = removeCardPopup.card;
    const cardId = removeCardPopup.cardId;
    console.log(removeCardPopup);

    api.removeCard(cardId)
        .then(() => {
            removeCardPopup.close();
            card.remove();
        })
        .catch(err => console.log(err));
}

Promise.all([api.getMyUser(), api.getInitialCards()])
    .then(res => {
        const [user, cards] = res;

        cardsSection = new Section({
            items: cards,
            renderer: (item) => addCard(item)
        }, cardConstants.cardListSelector);

        userInfo.setUserInfo(user);
        cardsSection.generateItems();
    })
    .catch(err => console.log(err));