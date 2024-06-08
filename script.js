function setErrorMessage(input) {
  const errorMessage = document.querySelector(`${input.id}-error`);
  if (input.validity.typeMismatch) {
    errorMessage.textContent = `Entered value needs to be a ${input.id}`;
  } else if (input.validity.valueMissing) {
    errorMessage.textContent = "Please enter info.";
  } else if (input.validity.patternMismatch) {
    errorMessage.textContent = `Please make sure value is in ${input.id} format`;
  } else if (
    input.validity.patternMismatch &&
    errorMessage.type === "password"
  ) {
    errorMessage.textContent =
      "Password to have min. 8 characters, one number, one letter and one special character";
  }
}
