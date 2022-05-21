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

const body = document.querySelector('body');

// Profile
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileButtonElement = document.querySelector('.profile__edit');

// Cards
const cardsListElement = document.querySelector('.cards__list');
const cardAddButtonElement = document.querySelector('.profile__add-photo');
const cardTemplate = document.querySelector('#card-template').content;

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
const cardPopupSubmitBtnElement = cardPopup.querySelector('.form');

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
    cardPopupSubmitBtnElement.addEventListener('submit', submitAddCard);

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

function renderCard(card) {
    const cardElement = createCardElement(card);

    cardsListElement.prepend(cardElement);
}

function createCardElement(card) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImageElement = cardElement.querySelector('.card__image');
    cardImageElement.src = card.link;
    cardImageElement.alt = card.name;
    cardImageElement.addEventListener('click', e => openCardDetailsPopup(card));
    
    const cardCaptionElement = cardElement.querySelector('.card__caption');
    cardCaptionElement.textContent = card.name;

    const trashElement = cardElement.querySelector('.card__trash');
    trashElement.addEventListener('click', evt => evt.target.closest('.card').remove());

    const likeElement = cardElement.querySelector('.card__like');
    likeElement.addEventListener('click', evt => evt.target.classList.toggle('card__like_active'));

    return cardElement;
}

function openEditProfilePopup() {
    profilePopupNameElement.value = profileNameElement.textContent;
    profilePopupDescriptionElement.value = profileDescriptionElement.textContent;

    openPopup(profilePopup);
}

function openCardDetailsPopup(card) {
    cardDetailsPopupImageElement.src = card.link;
    cardDetailsPopupImageElement.alt = card.name;
    cardDetailsPopupDescriptionElement.textContent = card.name;

    openPopup(cardDetailsPopup);
}

function openAddCardPopup() {
    cardPopupSubmitBtnElement.reset();

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