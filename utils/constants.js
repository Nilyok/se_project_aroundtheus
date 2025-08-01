export const initialTodos = [
  { text: "Buy groceries", checked: false },
  { text: "Walk the dog", checked: true },
  { text: "Study JavaScript", checked: false }
];

export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

