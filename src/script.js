function $(id) {
    return document.getElementById(id);
}

const INPUT = $('input');
const CREATE = $('create');
const LIST = $('list');
const GARBAGE = $('garbage');
const CLEAN = $('clean');

const generateId = (() => {
    let id = 1;
    return () => {
        return id++;
    };
})();
let leakyElements = [];

function createDoneButton() {
    const button = document.createElement('button');
    button.textContent = '✔';
    return button;
}

function createTodoTextElement(contents) {
    const spanElement = document.createElement('span');
    spanElement.textContent = contents;

    if (GARBAGE.checked) {
        leakyElements.push(spanElement);
    }
    return spanElement;
}

function createTodoElement(contents) {
    const id = generateId();
    const doneButton = createDoneButton();
    doneButton.setAttribute('data-button-id', `${id}: ${contents}`);

    const todoText = createTodoTextElement(contents);
    todoText.setAttribute('data-span-id', `${id}: ${contents}`);

    const container = document.createElement('div');
    container.appendChild(doneButton);
    container.appendChild(todoText);
    container.setAttribute('data-div-id', `${id}: ${contents}`);

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
    INPUT.focus();
}

CREATE.addEventListener('click', createTodo);
INPUT.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTodo();
    }
});

INPUT.focus();

CLEAN.addEventListener('click', () => {
    leakyElements = [];
});