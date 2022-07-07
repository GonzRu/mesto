import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import {formConstants, cardConstants, selectors, profileButtonElement,
    profilePopupNameElement, profilePopupDescriptionElement,
    editAvatarButtonElement, newCardButtonElement} from "../utils/constants.js";
import { Api } from '../utils/Api.js';
import '../pages/index.css';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/',
    headers: {
        authorization: '9e108d88-c2fd-47e7-9a58-31060be64a40',
        'Content-Type': 'application/json'
    }
});

// Popups
const cardDetailsPopup = new PopupWithImage(selectors.cardDetails.popup);
const newCardPopup = new PopupWithForm(selectors.newCard.popup, (evt) => submitAddCard(evt));
const removeCardPopup = new PopupWithConfirmation(selectors.removeCard.popup, (evt) => submitRemoveCard(evt));
const profilePopup = new PopupWithForm(selectors.profile.popup, (evt) => submitEditProfile(evt));
const editAvatarPopup = new PopupWithForm(selectors.editAvatar.popup, (evt) => submitEditAvatar(evt));

newCardPopup.setEventListeners();
cardDetailsPopup.setEventListeners();
removeCardPopup.setEventListeners();
profilePopup.setEventListeners();
editAvatarPopup.setEventListeners();

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
const editAvatarForm = document.forms[selectors.editAvatar.form];
const profileValidation = new FormValidator(formConstants, profileForm);
const newCardValidation = new FormValidator(formConstants, newCardForm);
const editAvatarValidation = new FormValidator(formConstants, editAvatarForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();

// Section
let cardsSection = null;

initSubscriptions();

function initSubscriptions() {
    profileButtonElement.addEventListener('click', () => {
        const user = userInfo.getUserInfo();
        profilePopupNameElement.value = user.name;
        profilePopupDescriptionElement.value = user.description;
    
        profileValidation.resetState();
        profilePopup.open();
    });
    
    newCardButtonElement.addEventListener('click', () => {
        newCardValidation.resetState();
        newCardPopup.open();
    });

    editAvatarButtonElement.addEventListener('click', () => {
        editAvatarValidation.resetState();
        editAvatarPopup.open();
    });
}

function addCard(cardData) {
    const cardElement = createCardElement(cardData, userInfo.getUserId());
    renderCard(cardElement);
}

function createCardElement(cardData, userId) {
    const callbacks = {
        openFn: () => cardDetailsPopup.open(cardData),
        removeFn: (card) => {
            removeCardPopup.open(card, cardData._id);
        },
        likeFn: (like) => {
            const promise = like ? api.likeCard(cardData._id) : api.unlikeCard(cardData._id);
            
            promise
            .then(c => card.update(c))
            .catch(err => console.log(err));
        }
    };

    const card = new Card(cardData, cardConstants, userId, callbacks);
    return card.createElement();
}

function renderCard(cardElement) {
    cardsSection.addItem(cardElement);
}

function submitEditProfile({name, description}) {
    api.updateMyUser({name: name, about: description})
    .then(user => {
        userInfo.setUserInfo(user);
        profilePopup.close();
    })
    .catch(err => console.log(err));
}

function submitEditAvatar({link}) {
    api.updateAvatar({avatar: link})
    .then(user => {
        userInfo.setUserInfo(user);
        editAvatarPopup.close();
    })
    .catch(err => console.log(err));
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

function submitRemoveCard({card, cardId}) {
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
            renderer: (item) => addCard(item)
        }, cardConstants.cardListSelector);

        userInfo.setUserInfo(user);

        cards.reverse().forEach(card => addCard(card));
    })
    .catch(err => console.log(err));