let currentValue = "";
let previousValue = "";
let operation = null;
let setScreen = false;

const display = document.getElementById("result");
display.value = "0";

// Add event listeners to all buttons
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("numbers")) {
      inputNumber(button.textContent);
    } else if (button.classList.contains("operators")) {
      inputOperator(button.textContent);
    } else if (button.classList.contains("equals")) {
      calculate();
    } else if (button.classList.contains("decimal")) {
      inputDecimal();
    } else if (button.classList.contains("clear")) {
      clear();
    } else if (button.classList.contains("delete")) {
      deleteNumber();
    }
  });
});

function inputNumber(number) {
  if (setScreen) {
    display.value = number;
    setScreen = false;
  } else {
    display.value = display.value === "0" ? number : display.value + number;
  }
  currentValue = display.value;
}

function inputOperator(op) {
  if (operation !== null) calculate();
  previousValue = display.value;
  operation = op;
  setScreen = true;
}

function calculate() {
  if (operation === null || setScreen) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  display.value = Math.round(result * 1000000) / 1000000;
  operation = null;
  currentValue = display.value;
  setScreen = true;
}

function inputDecimal() {
  if (setScreen) {
    display.value = "0.";
    setScreen = false;
  } else if (!display.value.includes(".")) {
    display.value += ".";
  }
  currentValue = display.value;
}

function clear() {
  display.value = "0";
  currentValue = "";
  previousValue = "";
  operation = null;
}

function deleteNumber() {
  display.value = display.value.slice(0, -1);
  currentValue = display.value;
}
