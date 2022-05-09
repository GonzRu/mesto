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
const cardsList = document.querySelector('.cards__list');
const editBtn = document.querySelector('.profile__edit');
const closeBtn = document.querySelector('.popup__close-btn');
const form = document.querySelector('.form');

const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');

const nameLabel = document.querySelector('.profile__name');
const descriptionLabel = document.querySelector('.profile__description');

editBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', hidePopup);
form.addEventListener('submit', save);

initialCards.forEach(addCard);

function addCard(card) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__caption').textContent = card.name;

    cardsList.append(cardElement);
}

function showPopup() {
    nameInput.value = nameLabel.textContent;
    descriptionInput.value = descriptionLabel.textContent;

    popup.classList.add('popup_opened');
    body.classList.add('page_fixed');
}

function hidePopup() {
    popup.classList.remove('popup_opened');
    body.classList.remove('page_fixed');
}

function save(e) {
    e.preventDefault();
    
    nameLabel.textContent = nameInput.value;
    descriptionLabel.textContent = descriptionInput.value;

    hidePopup();
}