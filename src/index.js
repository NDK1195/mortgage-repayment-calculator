const form = document.getElementById("form");
const btnClearAll = document.getElementById("btn-clear-all");
const emptyResults = document.getElementById("empty-results");
const completedResults = document.getElementById("completed-results");
const monthlyRepay = document.getElementById("monthly-repay");
const totalRepay = document.getElementById("total-repay");

const inputAmount = document.getElementById("amount");
const inputInterestRate = document.getElementById("interest-rate");
const inputTerm = document.getElementById("term");
const radioRepayment = document.getElementById("repayment");
const radioInterestOnly = document.getElementById("interest-only");

const errorTextAmount = document.getElementById("error-text-amount");
const errorTextRate = document.getElementById("error-text-rate");
const errorTextTerm = document.getElementById("error-text-term");
const errorType = document.getElementById("error-text-type");

btnClearAll.addEventListener("click", () => {
  inputAmount.value = "";
  inputInterestRate.value = "";
  inputTerm.value = "";
  radioRepayment.checked = false;
  radioInterestOnly.checked = false;

  addFocusOutStyle(errorTextAmount, 0);
  addFocusOutStyle(errorTextRate, 1);
  addFocusOutStyle(errorTextTerm, 1);
  errorType.classList.add("hidden");

  emptyResults.classList.remove("hidden");
  completedResults.classList.add("hidden");
});

// reset error message
inputAmount.addEventListener("focus", () => {
  addFocusStyle(errorTextAmount, 0);
});

inputAmount.addEventListener("focusout", () => {
  addFocusOutStyle(errorTextAmount, 0);
});

inputInterestRate.addEventListener("focus", () => {
  addFocusStyle(errorTextRate, 1);
});
inputInterestRate.addEventListener("focusout", () => {
  addFocusOutStyle(errorTextRate, 1);
});

inputTerm.addEventListener("focus", () => {
  addFocusStyle(errorTextTerm, 1);
});
inputTerm.addEventListener("focusout", () => {
  addFocusOutStyle(errorTextTerm, 1);
});

radioRepayment.addEventListener("change", () => {
  errorType.classList.add("hidden");
});

radioInterestOnly.addEventListener("change", () => {
  errorType.classList.add("hidden");
});

function addFocusStyle(input, childrenIndex) {
  input.classList.add("hidden");
  input.previousElementSibling.style.borderColor = "#d8db2f";
  input.previousElementSibling.children[childrenIndex].style.backgroundColor =
    "#d8db2f";
  input.previousElementSibling.children[childrenIndex].style.color = "#133041";
}

function addFocusOutStyle(input, childrenIndex) {
  input.classList.add("hidden");
  input.previousElementSibling.style.borderColor = "#6b94a8";
  input.previousElementSibling.children[childrenIndex].style.backgroundColor =
    "#e4f4fd";
  input.previousElementSibling.children[childrenIndex].style.color = "#4e6e7e";
}

function addErrorStyle(input, childrenIndex, errorMessage) {
  input.classList.remove("hidden");
  input.previousElementSibling.style.borderColor = "#d73328";
  input.previousElementSibling.children[childrenIndex].style.backgroundColor =
    "#d73328";
  input.previousElementSibling.children[childrenIndex].style.color = "white";
  input.textContent = errorMessage;
}

function validateInput() {
  let isValidate = true;

  if (inputAmount.value === "") {
    addErrorStyle(errorTextAmount, 0, "This field is required");
    isValidate = false;
  }

  if (Number(inputAmount.value) < 0) {
    addErrorStyle(errorTextAmount, 0, "Amount must be greater than 0");
    isValidate = false;
  }

  if (inputTerm.value === "") {
    addErrorStyle(errorTextTerm, 1, "This field is required");
    isValidate = false;
  }

  if (Number(inputTerm.value) < 0) {
    addErrorStyle(errorTextTerm, 1, "Term must be greater than 0");
    isValidate = false;
  }

  if (inputInterestRate.value === "") {
    addErrorStyle(errorTextRate, 1, "This field is required");
    isValidate = false;
  }

  if (Number(inputInterestRate.value) < 0) {
    addErrorStyle(errorTextRate, 1, "Interest rate must be greater than 0");
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
    if (radioRepayment.checked) {
      const monthlyPayment = calculateMortgage(
        inputAmount.value,
        inputInterestRate.value,
        inputTerm.value,
      );
      displayResult(monthlyPayment);
    } else if (radioInterestOnly.checked) {
      const monthlyPayment = calculateMortgageInterestOnly(
        inputAmount.value,
        inputInterestRate.value,
      );
      displayResult(monthlyPayment);
    }
  }
});

function displayResult(monthlyPayment) {
  emptyResults.classList.add("hidden");
  completedResults.classList.remove("hidden");
  completedResults.classList.add("flex");
  monthlyRepay.textContent = new Intl.NumberFormat("en-GB").format(
    monthlyPayment.toFixed(2),
  );
  totalRepay.textContent = new Intl.NumberFormat("en-GB").format(
    (monthlyPayment * inputTerm.value * 12).toFixed(2),
  );
}

function calculateMortgage(amount, interestRate, loanTerm) {
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    (amount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return monthlyPayment;
}

function calculateMortgageInterestOnly(amount, interestRate) {
  const monthlyInterestRate = interestRate / 12 / 100;
  const monthlyPayment = amount * monthlyInterestRate;
  return monthlyPayment;
}
