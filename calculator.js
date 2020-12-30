const buttons = document.querySelectorAll('.button');
const textArea = document.querySelector('#text-area');
buttons.forEach(button => button.addEventListener('click', () => {
	textArea.textContent += button.textContent;
}));