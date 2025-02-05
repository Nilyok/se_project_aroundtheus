// console.log("hello from validation.js");
// Enabling validation by calling enableValidation
// Pass all the settings on call
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = '';
    errorMessageEl.classList.remove(errorClass);
}

// function showInputError(formEl, inputEl, options) {
//     const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
//     errorElement.textContent = inputEl.validationMessage; // Set the actual error message from the input validity
//     errorElement.classList.add(options.errorClass); // Assuming errorClass controls visibility
// }

// function hideInputError(formEl, inputEl, options) {
//     const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
//     errorElement.textContent = ''; // Clear any error message
//     errorElement.classList.remove(options.errorClass); // Hide the error element
// }


function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

// function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
//     let foundInvalid = false;

//     inputEls.forEach(inputEl => {
//         if(inputEl.validity.valid) {
//             foundInvalid = true;
//         }
//     });

//     if(foundInvalid) {
//         submitButton.classList.add(inactiveButtonClass);
//         submitButton.disabled = true;
//     } else {
//         submitButton.classList.remove(inactiveButtonClass);
//         submitButton.disabled = false;
//     }
// }

function toggleButtonState(formEl, options) {
    const inputEls = formEl.querySelectorAll(options.inputSelector);
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    const allValid = Array.from(inputEls).every(input => input.validity.valid);

    submitButton.disabled = !allValid;
    if (!allValid) {
        submitButton.classList.add(options.inactiveButtonClass, 'disabled');
    } else {
        submitButton.classList.remove(options.inactiveButtonClass, 'disabled');
    }
}

function setEventListeners (formEl, options) {
    const {inputSelector} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector('.popup__button');

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(formEl, options);
        });
    });

    toggleButtonState(formEl, options);
}

function enableValidation(options) {  // Changed 'enablevalidation' to 'enableValidation'
    const formEls = [...document.querySelectorAll(options.formSelector)];

    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        setEventListeners(formEl, options);
        // look for all inputs inside of form
        // look through all the inputs to see if all are Valid
        // if input is not Valid
        // get validation message
        // add error class to input
        // display error message
        // disable button
        // if all inputs are valid
        // enable button
        // reset error message
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);
