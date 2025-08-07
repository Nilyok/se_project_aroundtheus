/* -------------------------------------------------------------------------- */
/*                               Import FormValidator                         */
/* -------------------------------------------------------------------------- */
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/* ------------------------- Utilities and constants ------------------------ */
import { initialCards, validationConfig } from "../utils/constants.js";

/* ---------------------------- Styles and assets --------------------------- */
import '../blocks/index.css';
import logo from '../images/logo.svg';
import avatar from '../images/jacques-cousteau.png';
import trashIcon from '../images/Trash.svg';

/* ------------------------- Element declarations --------------------------- */
const headerImage = document.querySelector('.header__img');
headerImage.src = logo;

const profileImage = document.querySelector('.profile__image');
profileImage.src = avatar;

const trashIconElement = document
  .querySelector('#card-template')
  .content.querySelector('.card__delete-button img');
trashIconElement.src = trashIcon;

const formValidators = {};

/* ------------------------- User Info Instance ----------------------------- */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description"
});

/* ----------------------------- Validation ---------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const addNewCardButton = document.querySelector(".profile__add-button");

/* ---------------------------- Initialize Popups ---------------------------- */
const imagePopup = new PopupWithImage("#modal__preview");
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData["profile-title"],
    description: formData["profile-description"]
  });
  formValidators["profile-form"].resetValidation();
});
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm("#add-card-modal", (formData) => {
  cardSection.addItem(createCard({
  name: formData["card-title"],
  link: formData["card-url"]
}));


  addCardFormPopup.resetForm();
  formValidators["add-card-form"].resetValidation();
});

addCardFormPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                              Event Listeners                               */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileTitleInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.description;
  profileFormPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                              Cards Section                                 */
/* -------------------------------------------------------------------------- */

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards__list"
);

cardSection.renderItems();

