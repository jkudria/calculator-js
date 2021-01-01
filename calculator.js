const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const textArea = document.querySelector('#text-area');
const clearButton = document.querySelector('#clear');

const operators = {
	plus: (a, b) => a + b,
	minus: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

// const operatorStrings = ['plus', 'minus', 'multiply', 'divide'];

let currentNumber = '0';
let tokens = [];

textArea.textContent = currentNumber;

clearButton.addEventListener('click', () => {
	tokens = [];
	textArea.textContent = '0';
})

digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
	// if currently just 0, we want to replace it with whatever user is inputting:
	if (currentNumber === '0') {
		currentNumber = digitButton.textContent;
	}  else {
		currentNumber += digitButton.textContent;
	}

	textArea.textContent = currentNumber;
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {

	// first we resolve the first operation
	if (tokens.length === 2) {
		let result = operate(
			parseFloat(tokens[0]),
			parseFloat(currentNumber),
			tokens[1]
		);
		
		// restart with the first number as the result of previous operation
		tokens = [];
		tokens.push(result);
		textArea.textContent = result;
	} else {
		tokens.push(currentNumber);
	}

	tokens.push(operatorButton.id);
	currentNumber = '0'
	console.log(tokens);
}));

function processToken(button) {
	if (button.classList.contains('operator')) {

		tokens.push(button.id);
	} else {
		tokens.push(button.textContent);
	}
}

function operate(a, b, operator) {
	return operators[operator](a, b);
}