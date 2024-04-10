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
const profileAddmodal = document.querySelector("#add-card-modal")
const modalCloseButton = document.querySelector("#modal-close-button");
const modalAddCloseButton = document.querySelector("#addCard-modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate= document.querySelector("#card-template").content.firstElementChild;
const addNewCardbutton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = document.querySelector("#add-card-modal #modal-close-button");


/* -------------------------------------------------------------------------- */
/*                                  Function                                  */
/* -------------------------------------------------------------------------- */
function closePopup() {
    profileEditmodal.classList.remove("modal_opened");
    profileAddmodal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector(".card__like-button")
    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

    
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button-active");
    });

    cardImageEl.addEventListener('click', () => {
        imageModalImage.src = cardData.link;
        imageModalImage.alt = cardData.name;
        imageModalCaption.textContent = cardData.name;
        openModal(imageModal);
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
    closePopup();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditmodal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopup);
profileForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardbutton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileAddmodal.classList.add("modal_opened");
});

addCardModalCloseButton.addEventListener("click", () => {
    profileAddmodal.classList.remove("modal_opened");
});


initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.appendChild(cardElement);
});

// const likeButtons = document.querySelectorAll(".card__like-button");
// likeButtons.forEach(likeButton => {
//     likeButton.addEventListener("click", () => {
//         likeButton.classList.toggle("card__like-button-active");
//     })
// });
