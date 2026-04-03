let firstOperand = "0";
let operator = "";
let secondOperand = "";
const operators = ["+", "-", "*", "÷", "%"];

let body = document.querySelector("body");
let calculator = document.querySelector("#calculator");
let numberDisplayedDiv = document.querySelector("#display-number");

const errorDiv = document.createElement("div");
body.appendChild(errorDiv);

const showError = (message) => {
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
};

const clearError = () => {
  errorDiv.textContent = "";
};

const displayOutputExpression = () => {
  let output = "0";

  if (firstOperand) output = firstOperand;
  if (operator) {
    output += ` ${operator}`;
    if (secondOperand) {
      output += ` ${secondOperand}`;
    }
  }

  return output;
};

const displayOutput = () =>
  (numberDisplayedDiv.textContent = displayOutputExpression());

// Add event listener to get teh value from button
calculator.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const value = button.dataset.value;
  clearError();

  takingInput(value);
});

const takingInput = (input) => {
  console.log({ input });
  if (!isNaN(input)) displayOperand(input);
  if (operators.includes(input)) operateInput(input);
  if (input === "=") calculate();
  if (input === "ac") clearAll();
  if (input === "+/-") plusMinus();
  displayOutput();
};

const displayOperand = (input) => {
  if (operator !== "") {
    secondOperand += input;
  } else {
    if (firstOperand === "0") {
      firstOperand = input;
    } else {
      firstOperand += input;
    }
  }
};

const operateInput = (input) => {
  if (operator !== "") {
    calculate();
  }
  operator = input;
};

// Calculate function
const calculate = () => {
  if (secondOperand === "") return;

  const a = parseInt(firstOperand);
  const b = parseInt(secondOperand);

  if (operator === "÷" && b === 0) {
    showError("Cannot divide by zero");
  } else {
    switch (operator) {
      case "+":
        firstOperand = (a + b).toString();
        break;
      case "-":
        firstOperand = (a - b).toString();
        break;
      case "*":
        firstOperand = (a * b).toString();
        break;
      case "÷":
        firstOperand = (a / b).toString();
        break;
      case "%":
        firstOperand = (a % b).toString();
    }
  }

  // clear after calculation
  secondOperand = "";
  operator = "";
};

const clearAll = () => {
  firstOperand = "0";
  operator = "";
  secondOperand = "";
};

const plusMinus = () => {
  if (secondOperand === "") {
    if (operator !== "") return;
    firstOperand *= -1;
  } else {
    secondOperand *= -1;
  }
};
