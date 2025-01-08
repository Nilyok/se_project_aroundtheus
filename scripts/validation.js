console.log("hello from validation.js");

// Enabling validation by calling enableValidation()
// Pass all the settings on call
function setEventListeners (formEl, options) {
    const {inputSelector} = options;
    const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
    console.log(inputEls);
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
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

enableValidation(config);