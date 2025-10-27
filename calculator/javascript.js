// let firstNumber = "";
// let secondNumber = "";
// let operation = null;
// function appendNumber(num) {
//   let display = document.getElementById("display");
//   if (!operation) {
//     firstNumber += num;
//     display.innerHTML = firstNumber;
//   } else {
//     secondNumber += num;
//     display.innerHTML = secondNumber;
//   }
// }
// function setOperation(op) {
//   if (firstNumber == "") return;
//   operation = op;
//   document.getElementById("display").innerHTML = operation;
// }
// function calculate() {
//   if (firstNumber == "" || secondNumber == "" || !operation) return;
//   let result = 0;
//   let num1 = parseFloat(firstNumber);
//   let num2 = parseFloat(secondNumber);
//   if (operation == "+") {
//     result = num1 + num2;
//   } else if (operation == "-") {
//     result = num1 - num2;
//   } else if (operation == "/") {
//     result = num1 / num2;
//   } else if (operation == "*") {
//     result = num1 * num2;
//   }
//   let expression = `${num1}${operation}${num2}=${result}`;
//   document.getElementById("display").innerHTML = expression;
//   firstNumber = result.toString();
//   secondNumber = "";
//   operation = null;
// }
// function clearDisplay() {
//   firstNumber = "";
//   secondNumber = "";
//   operation = null;
//   document.getElementById("display").innerHTML = 0;
// }
// -------------------------------------------------------------------------------------------------------
// let firstNumber = "";
// let secondNumber = "";
// let operation = null;
// let displayValue = "";
// let result = null;
// let justCalculated = false;
// let display = document.getElementById("display");
// function updateDisplay(value) {
//   display.innerHTML = value || "0";
// }
// function appendNumber(num) {
//   if (justCalculated) {
//     firstNumber = "";
//     result = null;
//     displayValue = "";
//     justCalculated = false;
//   }
//   if (!operation) {
//     firstNumber += num;
//     displayValue = firstNumber;
//   } else {
//     secondNumber += num;
//     displayValue = `${firstNumber}${operation}${secondNumber}`;
//   }
//   updateDisplay(displayValue);
// }
// function setOperation(op) {
//   if (result !== null && justCalculated) {
//     firstNumber = result.toString();
//     result = null;
//     justCalculated = false;
//   }
//   if (firstNumber == "") return;
//   if (operation && secondNumber !== "") {
//     calculate();
//     firstNumber = result.toString();
//   }
//   operation = op;
//   displayValue = `${firstNumber}${operation}`;
//   updateDisplay(displayValue);
// }
// function calculate() {
//   if (firstNumber == "" || secondNumber == "" || operation == null) return;
//   let num1 = parseFloat(firstNumber);
//   let num2 = parseFloat(secondNumber);
//   if (operation == "+") {
//     result = num1 + num2;
//   } else if (operation == "-") {
//     result = num1 - num2;
//   } else if (operation == "/") {
//     result = num1 / num2;
//   } else if (operation == "*") {
//     result = num1 * num2;
//   }
//   displayValue = `${num1}${operation}${num2} = ${result}`;
//   updateDisplay(displayValue);
//   firstNumber = result.toString();
//   secondNumber = "";
//   operation = null;
//   justCalculated = true;
// }
// function clearDisplay() {
//   displayValue = "";
//   result = null;
//   justCalculated = false;
//   firstNumber = "";
//   secondNumber = "";
//   operation = null;
//   updateDisplay("0");
// }
// -------------------------------------------------------------------------------------------------------
let currentExpression = "";
let currentNumber = "";
// let firstNumber = "";
// let secondNumber = "";
// let operation = null;
// let displayValue = "";
let result = null;
let justCalculated = false;
let display = document.getElementById("display");
function toPersianNumber(str) {
  let persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return str.toString().replace(/[0-9]/g, (d) => persianNumbers[d]);
}
function formatOperator(str) {
  return str.replace(/\*/g, "×").replace(/\//g, "÷");
}
function updateDisplay(value) {
  let formatted = formatOperator(value);
  display.innerHTML = toPersianNumber(formatted) || "۰";
}
function appendNumber(num) {
  if (justCalculated) {
    currentExpression = "";
    justCalculated = false;
  }
  currentNumber += num;
  currentExpression += num;
  updateDisplay(currentExpression);
}
function setOperation(op) {
  if (currentNumber == "" && result == null) return;
  if (justCalculated) {
    justCalculated = false;
    currentExpression = result.toString();
  }
  if (/[+\-*/]$/.test(currentExpression)) {
    currentExpression = currentExpression.slice(0, -1) + op;
    updateDisplay(currentExpression);
    return;
  }
  if (currentExpression && !justCalculated) {
    try {
      result = eval(currentExpression);
    } catch {
      updateDisplay("خطا");
      return;
    }
  }
  currentExpression = result !== null ? result + op : currentExpression + op;
  currentNumber = "";
  updateDisplay(currentExpression);
}
function calculate() {
  if (!currentExpression) return;
  try {
    result = eval(currentExpression);
    updateDisplay(currentExpression + "=" + result);
    currentExpression = result.toString();
    currentNumber = "";
    justCalculated = true;
  } catch {
    updateDisplay("خطا");
  }
}
function clearDisplay() {
  currentExpression = "";
  currentNumber = "";
  result = null;
  justCalculated = false;
  updateDisplay("۰");
}
document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (!isNaN(key)) {
    appendNumber(key);
  } else if (key == "+") {
    setOperation("+");
  } else if (key == "-") {
    setOperation("-");
  } else if (key == "*") {
    setOperation("*");
  } else if (key == "/") {
    setOperation("/");
  } else if (key == "Enter") {
    calculate();
  } else if (key == "c" || key == "C") {
    clearDisplay();
  } else if (key == "Backspace") {
    backspace();
  }
});
function backspace() {
  if (currentExpression.length === 0) return;
  currentExpression = currentExpression.slice(0, -1);
  currentNumber = currentNumber.slice(0, -1);
  updateDisplay(currentExpression);
}
