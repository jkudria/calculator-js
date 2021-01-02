const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');
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
// let tokens = [];

textArea.textContent = '0';

digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
	currentNumber += digitButton.textContent;
	textArea.textContent = currentNumber;
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
	
	// we resolve the pending operation (if any)
	if (currentOperator) {
		firstNumber = operate(
			parseFloat(firstNumber),
			parseFloat(currentNumber),
			currentOperator
		);
		textArea.textContent = firstNumber;
		currentOperator = null;
	} else if (!firstNumber) {
		// check if firstNumber hasn't already been set by an equals press
		firstNumber = currentNumber;
	}

	currentOperator = operatorButton.id;
	currentNumber = '';
}));

// TODO: this is incredibly redundant, especially in comparison to the operator logic
equalsButton.addEventListener('click', () => {
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
		firstNumber = operate(
			parseFloat(firstNumber),
			parseFloat(firstNumber),
			currentOperator
		);
		textArea.textContent = firstNumber;
		currentOperator = null;
	} else if (!(currentNumber === '')) {
		firstNumber = operate(
			parseFloat(firstNumber),
			parseFloat(currentNumber),
			currentOperator
		);
		textArea.textContent = firstNumber;
		currentOperator = null;
	}

	currentNumber = '';
});

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

function updateDisplay(value) {
	textArea.textContent = value;
}

function operate(a, b, operator) {
	return parseFloat(operators[operator](a, b)).toFixed(5).replace('.00000', '');
}