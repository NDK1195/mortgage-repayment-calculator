const form = document.getElementById("form");
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

// reset error message
inputAmount.addEventListener("focus", () => {
  errorTextAmount.classList.add("hidden");
  errorTextAmount.previousElementSibling.style.borderColor = "#d8db2f";
  errorTextAmount.previousElementSibling.children[0].style.backgroundColor =
    "#d8db2f";
  errorTextAmount.previousElementSibling.children[0].style.color = "#133041";
});
inputAmount.addEventListener("focusout", () => {
  errorTextAmount.classList.add("hidden");
  errorTextAmount.previousElementSibling.style.borderColor = "#6b94a8";
  errorTextAmount.previousElementSibling.children[0].style.backgroundColor =
    "#e4f4fd";
  errorTextAmount.previousElementSibling.children[0].style.color = "#4e6e7e";
});

inputInterestRate.addEventListener("focus", () => {
  errorTextRate.classList.add("hidden");
  errorTextRate.previousElementSibling.style.borderColor = "#d8db2f";
  errorTextRate.previousElementSibling.children[1].style.backgroundColor =
    "#d8db2f";
  errorTextRate.previousElementSibling.children[1].style.color = "#133041";
});
inputInterestRate.addEventListener("focusout", () => {
  errorTextRate.classList.add("hidden");
  errorTextRate.previousElementSibling.style.borderColor = "#6b94a8";
  errorTextRate.previousElementSibling.children[1].style.backgroundColor =
    "#e4f4fd";
  errorTextRate.previousElementSibling.children[1].style.color = "#4e6e7e";
});

inputTerm.addEventListener("focus", () => {
  errorTextTerm.classList.add("hidden");
  errorTextTerm.previousElementSibling.style.borderColor = "#d8db2f";
  errorTextTerm.previousElementSibling.children[1].style.backgroundColor =
    "#d8db2f";
  errorTextTerm.previousElementSibling.children[1].style.color = "#133041";
});
inputTerm.addEventListener("focusout", () => {
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
