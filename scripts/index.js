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

const popup = document.querySelector('.popup');
const body = document.querySelector('body');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profileButtonElement = document.querySelector('.profile__edit');
const popupCloseButtonElement = document.querySelector('.popup__close-btn');
const cardsListElement = document.querySelector('.cards__list');
const cardAddButtonElement = document.querySelector('.profile__add-photo');
const cardTemplate = document.querySelector('#card-template').content;

initSubscriptions();

initialCards.forEach(renderCard);

function initSubscriptions() {
    profileButtonElement.addEventListener('click', showEditProfilePopup);
    popupCloseButtonElement.addEventListener('click', hidePopup);
    cardAddButtonElement.addEventListener('click', showAddCardPopup);
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
    cardImageElement.addEventListener('click', e => showCardDetailsPopup(card));
    
    const cardCaptionElement = cardElement.querySelector('.card__caption');
    cardCaptionElement.textContent = card.name;

    const trashElement = cardElement.querySelector('.card__trash');
    trashElement.addEventListener('click', evt => evt.target.closest('.card').remove());

    const likeElement = cardElement.querySelector('.card__like');
    likeElement.addEventListener('click', evt => evt.target.classList.toggle('card__like_active'));

    return cardElement;
}

function showEditProfilePopup() {
    const editProfileFormTemplate = document.querySelector('#edit-profile').content;
    const editProfileElement = editProfileFormTemplate.querySelector('.form').cloneNode(true);

    editProfileElement.querySelector('#edit-profile-form-name').value = profileNameElement.textContent;
    editProfileElement.querySelector('#edit-profile-form-description').value = profileDescriptionElement.textContent;
    editProfileElement.addEventListener('submit', saveEditProfile);

    showPopup(editProfileElement);
}

function showCardDetailsPopup(card) {
    const cardDetailsTemplate = document.querySelector('#card-details').content;
    const cardDetailsElement = cardDetailsTemplate.querySelector('.card-details').cloneNode(true);

    cardDetailsElement.querySelector(".card-details__image").src = card.link;
    cardDetailsElement.querySelector(".card-details__image").alt = card.name;
    cardDetailsElement.querySelector(".card-details__description").textContent = card.name;

    showPopup(cardDetailsElement);
}

function showAddCardPopup() {
    const addCardTemplate = document.querySelector('#add-card').content;
    const addCardElement = addCardTemplate.querySelector('.form').cloneNode(true);

    addCardElement.addEventListener('submit', addCardSubmit);

    showPopup(addCardElement);
}

function showPopup(popupContent) {
    const popupContentElement = document.querySelector('#popup__content');
    popupContentElement.innerHTML = '';
    popupContentElement.append(popupContent);

    popup.classList.add('popup_opened');
    body.classList.add('page_fixed');
}

function hidePopup() {
    popup.classList.remove('popup_opened');
    body.classList.remove('page_fixed');
}

function saveEditProfile(e) {
    e.preventDefault();
    
    profileNameElement.textContent = e.target.querySelector('#edit-profile-form-name').value;
    profileDescriptionElement.textContent = e.target.querySelector('#edit-profile-form-description').value;

    hidePopup();
}

function addCardSubmit(e) {
    e.preventDefault();
    
    const name = e.target.querySelector('#add-card-form-name').value;
    const link = e.target.querySelector('#add-card-form-link').value;

    const card = {
        name: name,
        link: link
    };

    renderCard(card)

    hidePopup();
}