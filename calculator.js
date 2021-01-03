const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const percentButton = document.querySelector('#percent');
const signButton = document.querySelector('#sign');
const clearButton = document.querySelector('#clear');
const textArea = document.querySelector('#text-area');

const operators = {
	plus: (a, b) => a + b,
	minus: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => {
		b !== 0 ? a / b : 'Cannot dividy by 0!';
	},
};

let firstNumber = null;
let currentNumber = '';
let currentOperator = null;
updateDisplay(0);

digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
	if (currentOperator === 'equals') {
		clear();
	}

	if (digitButton.textContent === '.') {
		if (currentNumber === '') {
			currentNumber += '0' + digitButton.textContent;
		}

		if (!currentNumber.includes('.')) {
			currentNumber += digitButton.textContent;
		}
	} else {
		currentNumber += digitButton.textContent;
	}

	updateDisplay(currentNumber);
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
	
	if (Object.keys(operators).includes(operatorButton.id)) {
		operatorButton.style.border = 'solid #333 2px';
	}
	
	if (operatorButton.id === 'equals') {
		equals();
	} else if (Object.keys(operators).includes(currentOperator)) {
		operate(
			parseFloat(firstNumber),
			parseFloat(currentNumber),
			currentOperator
		);
	} else if (!firstNumber) {
		// check if firstNumber hasn't already been set by an equals press
		firstNumber = currentNumber;
	}

	currentOperator = operatorButton.id;
	currentNumber = '';
}));

percentButton.addEventListener('click', () => {
	if (currentNumber) {
		currentNumber = currentNumber / 100;
		updateDisplay(currentNumber);
	} else if (firstNumber) {
		firstNumber = parseFloat(firstNumber) / 100;
		updateDisplay(firstNumber);
	}
});

signButton.addEventListener('click', () => {
	if (currentNumber) {
		currentNumber = -1 * parseFloat(currentNumber);
		updateDisplay(currentNumber);
	} else if (firstNumber) {
		firstNumber = -1 * parseFloat(firstNumber);
		updateDisplay(firstNumber);
	}
});
	
clearButton.addEventListener('click', () => {
	clear();
	updateDisplay(0);
})

function equals() {
	/*
	Four cases: 
		1. equal is pressed with no current operator
		2. equal is pressed right after operator (without second number) 
		3. equal is pressed right after num op num sequence
		4. equal is pressed right after equal (i.e. repeat previous operation with result as new firstNumber)
	*/

	if (!currentOperator) {
		// do nothing
		// TODO: maybe trigger a visual signal that equal was pressed with no result
	} else if (currentOperator && currentNumber === '') {
		operate(
			parseFloat(firstNumber),
			parseFloat(firstNumber),
			currentOperator
		);
	} else if (!(currentNumber === '')) {
		operate(
			parseFloat(firstNumber),
			parseFloat(currentNumber),
			currentOperator
		);
	}

	currentNumber = '';
}

function clear() {
	if (currentOperator) {
		document.getElementById(currentOperator).style.border = '';
	}
	firstNumber = null;
	currentNumber = '';
	currentOperator = null;
}

function updateDisplay(value) {
	textArea.textContent = value.toString();
}

function operate(a, b, operator) {
	document.getElementById(operator).style.border = '';

	if (b === 0 && operator === 'divide') {
		updateDisplay('No div by 0!');
		clear();
	} else {
		firstNumber = Number(operators[operator](a, b).toFixed(5));
		updateDisplay(firstNumber)
	}

	currentOperator = null;
}