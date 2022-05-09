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
const editBtn = document.querySelector('.profile__edit');
const closeBtn = document.querySelector('.popup__close-btn');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');

editBtn.addEventListener('click', showEditProfilePopup);
closeBtn.addEventListener('click', hidePopup);

initialCards.forEach(addCard);

function addCard(card) {
    const cardsList = document.querySelector('.cards__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__caption').textContent = card.name;

    const trashElement = cardElement.querySelector('.card__trash');
    trashElement.addEventListener('click', evt => evt.target.parentElement.remove());

    const likeElement = cardElement.querySelector('.card__like');
    likeElement.addEventListener('click', evt => evt.target.classList.toggle('card__like_active'));

    const imageElement = cardElement.querySelector('.card__image');
    imageElement.addEventListener('click', e => showCardDetailsPopup(card));

    cardsList.append(cardElement);
}

function showEditProfilePopup() {
    const editProfileFormTemplate = document.querySelector('#edit-profile').content;
    const editProfileElement = editProfileFormTemplate.querySelector('.form').cloneNode(true);

    editProfileElement.querySelector('#name').value = nameLabel.textContent;
    editProfileElement.querySelector('#description').value = descriptionLabel.textContent;
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
    
    nameLabel.textContent = e.target.querySelector('#name').value;
    descriptionLabel.textContent = e.target.querySelector('#description').value;

    hidePopup();
}