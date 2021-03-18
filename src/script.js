function $(id) {
    return document.getElementById(id);
}

const INPUT = $('input');
const CREATE = $('create');
const LIST = $('list');

function createDoneButton() {
    const button = document.createElement('button');
    button.textContent = '✔';
    return button;
}

function createTodoTextElement(contents) {
    const spanElement = document.createElement('span');
    spanElement.textContent = contents;
    return spanElement;
}

function createTodoElement(contents) {
    const doneButton = createDoneButton();
    const todoText = createTodoTextElement(contents);
    const container = document.createElement('div');

    container.appendChild(doneButton);
    container.appendChild(todoText);

    doneButton.addEventListener('click', () => {
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
    });

    return container;
}

function createTodo() {
    const todoText = INPUT.value.trim();
    if (!todoText) {
        return;
    }

    const todoElement = createTodoElement(todoText);
    LIST.appendChild(todoElement);
    INPUT.value = '';
}

CREATE.addEventListener('click', createTodo);
INPUT.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTodo();
    }
});

INPUT.focus();

