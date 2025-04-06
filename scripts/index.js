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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditmodal = document.querySelector("#profile-edit-modal");
const profileAddmodal = document.querySelector("#add-card-modal");
const closeButtons = document.querySelectorAll('.modal__close');
const modalAddCloseButton = document.querySelector("#addCard-modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileForm = document.forms["profile-form"];
/* ------------------------------ Card Template ----------------------------- */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate= document.querySelector("#card-template").content.firstElementChild;
/* ------------------------------ Add New Card ------------------------------ */
const addNewCardbutton = document.querySelector(".profile__add-button")
const addCardFormElement = document.forms["add-card-form"];
const cardTitleInput = addCardFormElement.querySelector(".modal__input_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
/* ------------------------------ Card Preview ------------------------------ */
const previewModal = document.getElementById("modal__preview");
const previewImage = previewModal.querySelector(".modal__image-preview");
const previewTitle = previewModal.querySelector(".modal__image-title");



/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
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

function renderCard(cardData, cardListEl) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button-active");
    });

    cardImageEl.addEventListener('click', () => {
        previewImage.src = cardData.link;
        previewImage.alt = cardData.name;
        previewTitle.textContent = cardData.name;
        openPopup(previewModal);
    });
    
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;

    return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditmodal);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link }, cardListEl);
    closePopup(profileAddmodal);
    e.target.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(profileEditmodal);
});

profileForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

addNewCardbutton.addEventListener("click", () => {
    openPopup(profileAddmodal);
});

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popup = button.closest('.modal');
        closePopup(popup);
    });
});

// Click outside modal content to close
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closePopup(modal);
        }
    });
});

// Initialize cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));