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

const formInputs = document.querySelectorAll("input");

formInputs.forEach((input) => {
  const errorMessage = document.querySelector(`.${input.id}-error`);

  //   adds required attribute and class once input has received focus
  input.addEventListener("focus", () => {
    input.required = true;
    input.classList.add("user-focused");
  });

  //adds error message or class depending on validity
  input.addEventListener("blur", () => {
    if (input.validity.valid) {
      errorMessage.textContent = "";
      errorMessage.className = `${input.id}-error`;
    } else {
      setErrorMessage(input);
    }
  });
});
