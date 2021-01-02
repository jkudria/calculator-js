const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
// const equalsButton = document.querySelector('#equals');
const signButton = document.querySelector('#sign');
const clearButton = document.querySelector('#clear');
const textArea = document.querySelector('#text-area');

const operators = {
	plus: (a, b) => a + b,
	minus: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

// const operatorStrings = ['plus', 'minus', 'multiply', 'divide'];

let firstNumber = null;
let currentNumber = '';
let currentOperator = null;
textArea.textContent = '0';

digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
	currentNumber += digitButton.textContent;
	textArea.textContent = currentNumber;
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
	
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

signButton.addEventListener('click', () => {
	if (currentNumber) {
		currentNumber = (-1 * parseFloat(currentNumber)).toString();
		updateDisplay(currentNumber);
	} else if (firstNumber) {
		firstNumber = (-1 * parseFloat(firstNumber)).toString();
		updateDisplay(firstNumber);
	}
});
	
clearButton.addEventListener('click', () => {
	firstNumber = null;
	currentNumber = '';
	currentOperator = null;
	textArea.textContent = '0';
})

function equals() {
	/*
	Three cases: 
		1. equal is pressed with no current operator
		2. equal is pressed right after operator (without second number) 
		3. equal is pressed right after num op num sequence
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

function updateDisplay(value) {
	textArea.textContent = value.toString();
}

function operate(a, b, operator) {
	firstNumber = Number(operators[operator](a, b).toFixed(5));
	updateDisplay(firstNumber);
	currentOperator = null;
}