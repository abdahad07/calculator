let firstOperand = "0";
let operator = "";
let secondOperand = "";
let lastOperator = "";
let lastSecondOperand = "";
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
  if (input === "backspace") backspace();
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
  if (secondOperand === "" && lastOperator !== "") {
    operator = lastOperator;
    secondOperand = lastSecondOperand;
  }

  if (secondOperand === "") return;

  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);

  if (operator === "÷" && b === 0) {
    showError("Cannot divide by zero");
    return;
  }

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
      break;
  }

  // store last operation
  lastOperator = operator;
  lastSecondOperand = secondOperand;

  // clear for next input
  secondOperand = "";
  operator = "";
};

const clearAll = () => {
  firstOperand = "0";
  operator = "";
  secondOperand = "";
  lastOperator = "";
  lastSecondOperand = "";
};

const plusMinus = () => {
  if (secondOperand === "") {
    if (operator !== "") return;
    firstOperand *= -1;
  } else {
    secondOperand *= -1;
  }
};

const backspace = () => {
  if (secondOperand !== "") {
    secondOperand = secondOperand.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else {
    firstOperand = firstOperand.slice(0, -1);

    // prevent fallback to 0
    if (firstOperand === "" || firstOperand === "-") {
      firstOperand = "0";
    }
  }
};
