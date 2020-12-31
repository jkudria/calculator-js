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

const operatorStrings = ['plus', 'minus', 'multiply', 'divide'];
console.log(typeof operatorStrings);

let tokens = [];

textArea.textContent = '0';

clearButton.addEventListener('click', () => {
	tokens = [];
	textArea.textContent = '0';
})

digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
	// if currently just 0, we want to replace it with whatever user is inputting:
	console.log(tokens);
	console.log(isNaN(tokens[tokens.length - 1]));
	if (textArea.textContent === '0') {
		textArea.textContent = digitButton.textContent;
	} else if (operatorStrings.includes(tokens[tokens.length - 1])) {
		// if we just pressed an operator, we start a new number:
		textArea.textContent = digitButton.textContent;
	} else {
		textArea.textContent += digitButton.textContent;
	}

	// console.log(textArea.textContent);
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => {
	tokens.push(textArea.textContent);
	tokens.push(operatorButton.id);
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

// console.log(operate(5, 6, 'divide'));

5