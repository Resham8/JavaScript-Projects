const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const themeToggle = document.getElementById("theme-toggle");
let currentExpression = "";
let isDarkTheme = true;

function updateDisplay() {
  display.value = currentExpression || "0";
}

function handleNumber(num) {
  currentExpression += num;
  updateDisplay();
}

function handleOperator(op) {
  if (currentExpression === "" && op !== "-") return;
  if (["+", "-", "*", "/"].includes(currentExpression.slice(-1))) {
    currentExpression = currentExpression.slice(0, -1) + op;
  } else {
    currentExpression += " " + op + " ";
  }
  updateDisplay();
}

function handleDecimal() {
  const lastNumber = currentExpression.split(/[-+*/]/).pop();
  if (!lastNumber.includes(".")) {
    currentExpression += currentExpression.slice(-1) === " " ? "0." : ".";
    updateDisplay();
  }
}

function handleClear() {
  currentExpression = "";
  updateDisplay();
}

function handleEquals() {
  try {
    const result = eval(currentExpression);
    currentExpression = result.toString();
    updateDisplay();
  } catch (error) {
    display.value = "Error";
    setTimeout(() => {
      currentExpression = "";
      updateDisplay();
    }, 1000);
  }
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = isDarkTheme ? "☀️" : "🌙";
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      handleNumber(button.textContent);
    } else if (button.classList.contains("operator")) {
      handleOperator(button.textContent);
    } else if (button.classList.contains("decimal")) {
      handleDecimal();
    } else if (button.classList.contains("equals")) {
      handleEquals();
    } else if (button.classList.contains("clear")) {
      handleClear();
    }
  });
});

themeToggle.addEventListener("click", toggleTheme);

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    handleNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (key === "Enter" || key === "=") {
    handleEquals();
  } else if (key === "Escape") {
    handleClear();
  }
});

updateDisplay();
