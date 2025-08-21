/* -------------------------------------------------------------------------- */
/*                               Import modules                                */
/* -------------------------------------------------------------------------- */
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/* ------------------------- Utilities and constants ------------------------ */
import { validationConfig } from "../utils/constants.js";
import { logApiError } from "../utils/utils.js";

/* ---------------------------- Styles and assets --------------------------- */
import "../blocks/index.css";
import logo from "../images/logo.svg";
import trashIcon from "../images/Trash.svg";

/* ------------------------------- API config ------------------------------- */
const BASE_URL = "https://around-api.en.tripleten-services.com/v1";
const TOKEN = "49a35cbc-c77c-4092-9700-1188376b681d";

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Authorization: TOKEN,
    "Content-Type": "application/json",
  },
});

let currentUserId = null;

/* ------------------------------- DOM Ready -------------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  /* ------------------------- Static assets into DOM ------------------------- */
  const headerImage = document.querySelector(".header__img");
  if (headerImage) headerImage.src = logo;

  const trashIconElement = document
    .querySelector("#card-template")
    ?.content.querySelector(".card__delete-button img");
  if (trashIconElement) trashIconElement.src = trashIcon;

  /* ------------------------- Enable form validation ------------------------- */
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

  /* ------------------------------- Core instances --------------------------- */
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image", 
  });

  const imagePopup = new PopupWithImage("#modal__preview");
  imagePopup.setEventListeners();

  const confirmDeletePopup = new PopupWithConfirm("#confirm-delete-modal");
  confirmDeletePopup.setEventListeners();

  /* ----------------------------- Card handlers ------------------------------ */
  function handleImageClick(name, link) {
    imagePopup.open({ name, link });
  }

  function handleDeleteClick(cardInstance) {
    confirmDeletePopup.setSubmitAction(() => {
      const id = cardInstance.getId();

      if (!id) {
        cardInstance.removeCard();
        confirmDeletePopup.close();
        return Promise.resolve();
      }

      return api
        .deleteCard(id)
        .then(() => {
          cardInstance.removeCard();
          confirmDeletePopup.close();
        })
        .catch((err) => logApiError("delete card", err));
    });
    confirmDeletePopup.open();
  }

  function handleLikeToggle(cardInstance) {
    const id = cardInstance.getId();
    const shouldLike = !cardInstance.isLiked();

    api
      .changeLikeCardStatus(id, shouldLike)
      .then((updatedCard) => {
        cardInstance.setLikeState(Boolean(updatedCard.isLiked));
      })
      .catch((err) => logApiError("toggle like", err));
  }

  /* --------------------------- Card factory & list -------------------------- */
  function createCard(item) {
    const isLiked = typeof item.isLiked === "boolean"
      ? item.isLiked
      : (Array.isArray(item.likes) ? item.likes.some((u) => u._id === currentUserId) : false);

    const card = new Card(
      {
        name: item.name,
        link: item.link,
        _id: item._id,
        isLiked,
      },
      "#card-template",
      handleImageClick,
      handleDeleteClick,
      handleLikeToggle
    );
    return card.getView();
  }

  const cardSection = new Section(
    {
      items: [],
      renderer: (item) => createCard(item),
    },
    ".cards__list"
  );

  /* ------------------------------- Popups ----------------------------------- */
  const addCardFormPopup = new PopupWithForm("#add-card-modal", (formData) => {
    const payload = {
      name: (formData["card-title"] || "").trim(),
      link: (formData["card-url"] || "").trim(),
    };

    return api
      .addCard(payload)
      .then((card) => {
        cardSection.addItem(createCard(card), true);
        addCardFormPopup.resetForm();
        addCardFormPopup.close();
        formValidators["add-card-form"]?.resetValidation();
      })
      .catch((err) => logApiError("add card", err));
  });
  addCardFormPopup.setEventListeners();

  const profileFormPopup = new PopupWithForm("#profile-edit-modal", (formData) => {
    return api
      .updateProfile({
        name: (formData["profile-title"] || "").trim(),
        about: (formData["profile-description"] || "").trim(),
      })
      .then((user) => {
        userInfo.setUserInfo({ name: user.name, description: user.about });
        profileFormPopup.resetForm();
        profileFormPopup.close();
        formValidators["profile-form"]?.resetValidation();
      })
      .catch((err) => logApiError("update profile", err));
  });
  profileFormPopup.setEventListeners();

  let avatarFormPopup = null;
  const avatarModalEl = document.querySelector("#avatar-edit-modal");
  if (avatarModalEl) {
    avatarFormPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
      const url = (formData["avatar-url"] || "").trim();
      return api
        .updateAvatar(url)
        .then((updatedUser) => {
          userInfo.setUserInfo({
            name: updatedUser.name,
            description: updatedUser.about,
            avatar: updatedUser.avatar,
          });
          avatarFormPopup.resetForm();
          avatarFormPopup.close();
          formValidators["avatar-form"]?.resetValidation();
        })
        .catch((err) => logApiError("update avatar", err));
    });
    avatarFormPopup.setEventListeners();
  }

  /* --------------------- Fetch user + cards from server --------------------- */
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
      currentUserId = user._id;

      userInfo.setUserInfo({
        name: user.name,
        description: user.about,
        avatar: user.avatar,
      });

      cardSection.setItems(Array.isArray(cards) ? cards : []);
      cardSection.renderItems({ toStart: false });
    })
    .catch((err) => logApiError("initial load (user + cards)", err));

  /* ----------------------------- Event bindings ----------------------------- */
  const profileEditButton = document.querySelector("#profile-edit-button");
  const profileTitleInput = document.querySelector("#profile-title-input");
  const profileDescriptionInput = document.querySelector("#profile-description-input");
  const addNewCardButton = document.querySelector(".profile__add-button");
  const avatarEditBtn = document.querySelector(".profile__avatar-edit");

  profileEditButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    profileTitleInput.value = currentUser.name;
    profileDescriptionInput.value = currentUser.description;
    profileFormPopup.open();
  });

  addNewCardButton.addEventListener("click", () => {
    addCardFormPopup.open();
  });

  avatarEditBtn?.addEventListener("click", () => {
    const input = document.querySelector("#avatar-url");
    if (input) input.value = "";
    if (avatarFormPopup) avatarFormPopup.open();
  });
});
