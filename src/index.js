const form = document.getElementById("form");

const inputAmount = document.getElementById("amount");
const inputInterestRate = document.getElementById("interest-rate");
const inputTerm = document.getElementById("term");
const radioRepayment = document.getElementById("repayment");
const radioInterestOnly = document.getElementById("interest-only");

const errorTextAmount = document.getElementById("error-text-amount");
const errorTextRate = document.getElementById("error-text-rate");
const errorTextTerm = document.getElementById("error-text-term");
const errorType = document.getElementById("error-text-type");

// reset error message
inputAmount.addEventListener("focus", () => {
  errorTextAmount.classList.add("hidden");
  errorTextAmount.previousElementSibling.style.borderColor = "#6b94a8";
  errorTextAmount.previousElementSibling.children[0].style.backgroundColor =
    "#e4f4fd";
  errorTextAmount.previousElementSibling.children[0].style.color = "#4e6e7e";
});
inputInterestRate.addEventListener("focus", () => {
  errorTextRate.classList.add("hidden");
  errorTextRate.previousElementSibling.style.borderColor = "#6b94a8";
  errorTextRate.previousElementSibling.children[1].style.backgroundColor =
    "#e4f4fd";
  errorTextRate.previousElementSibling.children[1].style.color = "#4e6e7e";
});
inputTerm.addEventListener("focus", () => {
  errorTextTerm.classList.add("hidden");
  errorTextTerm.previousElementSibling.style.borderColor = "#6b94a8";
  errorTextTerm.previousElementSibling.children[1].style.backgroundColor =
    "#e4f4fd";
  errorTextTerm.previousElementSibling.children[1].style.color = "#4e6e7e";
});
radioRepayment.addEventListener("change", () => {
  errorType.classList.add("hidden");
});

radioInterestOnly.addEventListener("change", () => {
  errorType.classList.add("hidden");
});

function validateInput() {
  let isValidate = true;

  if (inputAmount.value === "") {
    errorTextAmount.classList.remove("hidden");
    errorTextAmount.previousElementSibling.style.borderColor = "#d73328";
    errorTextAmount.previousElementSibling.children[0].style.backgroundColor =
      "#d73328";
    errorTextAmount.previousElementSibling.children[0].style.color = "white";
    isValidate = false;
  }

  if (inputTerm.value === "") {
    errorTextTerm.classList.remove("hidden");
    errorTextTerm.previousElementSibling.style.borderColor = "#d73328";
    errorTextTerm.previousElementSibling.children[1].style.backgroundColor =
      "#d73328";
    errorTextTerm.previousElementSibling.children[1].style.color = "white";
    isValidate = false;
  }

  if (inputInterestRate.value === "") {
    errorTextRate.classList.remove("hidden");
    errorTextRate.previousElementSibling.style.borderColor = "#d73328";
    errorTextRate.previousElementSibling.children[1].style.backgroundColor =
      "#d73328";
    errorTextRate.previousElementSibling.children[1].style.color = "white";
    isValidate = false;
  }

  if (radioRepayment.checked === false && radioInterestOnly.checked === false) {
    errorType.classList.remove("hidden");
    isValidate = false;
  }

  return isValidate;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValidate = validateInput();

  if (isValidate) {
  }
});
