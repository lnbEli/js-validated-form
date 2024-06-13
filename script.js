// Open modal and submit buttons
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit");

closeButton.addEventListener("click", closeModal);
submitButton.addEventListener("click", submitForm);

function setErrorMessage(input) {
  const errorMessage = document.querySelector(`.${input.id}-error`);
  if (input.validity.typeMismatch) {
    errorMessage.textContent = `Entered value needs to be an ${input.id}`;
  } else if (input.validity.valueMissing) {
    errorMessage.textContent = "Please enter value";
  } else if (input.validity.patternMismatch && input.type === "password") {
    errorMessage.textContent =
      "Password to have min. 8 characters, one number, one letter and no special characters";
  } else if (input.validity.patternMismatch) {
    errorMessage.textContent = `Please make sure value is in ${input.id} format`;
  }
}

function manageFocus(event) {
  const input = event.target;
  input.required = true;
  input.classList.add("user-focused");
}

function manageBlur(event) {
  const input = event.target;
  const errorMessage = document.querySelector(`.${input.id}-error`);
  const passOne = document.querySelector("#password-one");
  const passTwo = document.querySelector("#password-two");
  const passOneError = document.querySelector(".password-one-error");
  const passTwoError = document.querySelector(".password-two-error");

  if (
    checkPasswordsAreEqual() &&
    passOne.validity.valid &&
    passTwo.validity.valid
  ) {
    passOneError.textContent = "";
    passTwoError.textContent = "";
    passOneError.className = "password-one-error";
    passTwoError.className = "password-two-error";
  } else if (input.validity.valid) {
    errorMessage.textContent = "";
    errorMessage.className = `${input.id}-error`;
  } else {
    setErrorMessage(input);
  }
}

//adds eventlisteners to inputs
function addEventListenerToInputs() {
  const formInputs = document.querySelectorAll("input");

  formInputs.forEach((input) => {
    //   adds required attribute and class once input has received focus
    input.addEventListener("focus", manageFocus);

    //adds error message or class depending on validity
    input.addEventListener("blur", manageBlur);
  });
}
addEventListenerToInputs();

function closeModal() {
  location.reload();
}

function submitForm() {
  const modal = document.querySelector(".modal-background");
  const form = document.querySelector("form");

  if (form.checkValidity() && checkPasswordsAreEqual()) {
    modal.style.display = "block";
  } else {
    setLegendBackgroundColors("rgb(244, 118, 95)", "white");
    checkInputsHaveBeenFocussedBeforeSubmit();
    setCheckPasswordsErrorMessages();
    return;
  }
}

function setCheckPasswordsErrorMessages() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach((input) => {
    const errorMessages = document.querySelectorAll(
      ".password-one-error,.password-two-error"
    );
    if (!checkPasswordsAreEqual()) {
      errorMessages.forEach((error) => {
        error.textContent = "Please make sure passwords are equal";
      });
    }
  });
}

// This focusses on all inputs to make sure that any warning messages are displayed
function checkInputsHaveBeenFocussedBeforeSubmit() {
  const formInputs = document.querySelectorAll("input");
  const submitButton = document.querySelector(".submit");
  formInputs.forEach((input) => {
    input.focus();
  });
  submitButton.focus();
}

//Check passwords match
function checkPasswordsAreEqual() {
  const passOne = document.querySelector("#password-one");
  const passTwo = document.querySelector("#password-two");
  if (passOne.value === passTwo.value) {
    return true;
  } else {
    return false;
  }
}

function setLegendBackgroundColors(bgColor, color) {
  const legend = document.querySelector("legend");
  legend.style.backgroundColor = bgColor;
  legend.style.color = color;
}
