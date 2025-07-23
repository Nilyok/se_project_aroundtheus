/* -------------------------------------------------------------------------- */
/*                               Import FormValidator                         */
/* -------------------------------------------------------------------------- */
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

/* ------------------------------ Validation Config ----------------------------- */
import { validationConfig } from "../utils/constants.js";

/* ------------------------- Setup Centralized Validators ------------------------ */
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
];

    const cardData = {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    };


/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#add-card-modal");
const closeButtons = document.querySelectorAll('.modal__close');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileForm = document.forms["profile-form"];
/* ------------------------------ Card Template ----------------------------- */
const cardListEl = document.querySelector(".cards__list");
/* ------------------------------ Add New Card ------------------------------ */
const addNewCardButton = document.querySelector(".profile__add-button")
const addCardFormElement = document.forms["add-card-form"];
const cardTitleInput = addCardFormElement.querySelector(".modal__input_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
/* ------------------------------ Card Preview ------------------------------ */
const previewModal = document.getElementById("modal__preview");
const previewImage = previewModal.querySelector(".modal__image-preview");
const previewTitle = previewModal.querySelector(".modal__image-title");



/* -------------------------------------------------------------------------- */
/*                                 Pop up Functions                           */
/* -------------------------------------------------------------------------- */

function handleEscapeKey(event) {
    if (event.key === "Escape") {
        closeOpenModal();
    }
}

function closePopup(popup) {
    popup.classList.remove("modal_opened");
    document.removeEventListener('keydown', handleEscapeKey);
}

function openPopup(popup) {
    popup.classList.add('modal_opened');
    document.addEventListener('keydown', handleEscapeKey);
}

function closeOpenModal() {
    const openedModal = document.querySelector('.modal_opened');
    if (openedModal) {
        closePopup(openedModal);
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Cards Functions                           */
/* -------------------------------------------------------------------------- */
function handleImageClick(name, link) {
        previewImage.src = link;
        previewImage.alt = name;
        previewTitle.textContent = name;
        openPopup(previewModal);
}

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  formValidators["profile-form"].resetValidation();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(profileAddModal);
  e.target.reset();
  formValidators["add-card-form"].resetValidation();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formValidators["profile-form"].resetValidation();
  openPopup(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopup(profileAddModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".modal");
    closePopup(popup);
  });
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closePopup(modal);
    }
  });
});

// Initialize cards
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
});
