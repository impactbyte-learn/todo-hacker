// ===========================================================================
// DOM ELEMENTS

const todoInputForm = document.getElementById("todo-input-form")
const todoSearchForm = document.getElementById("todo-search-form")
const todoOutput = document.getElementById("todo-output")

// ===========================================================================
// DATA STORAGE

let TODOS = []

const get = () => {
    return TODOS
};

const set = (todos) => {
    TODOS = todos
};

// ===========================================================================
// DATA SEEDER

const seed = (todos) => {
    todos.push({
        text: `Wake up in the morning`,
        date: new Date()
    }, {
        text: `Take a warm shower`,
        date: new Date()
    }, {
        text: `Get ready with casual clothes`,
        date: new Date()
    }, {
        text: `Do some work with the laptop`,
        date: new Date()
    }, {
        text: `Hack some servers`,
        date: new Date()
    }, {
        text: `Rule the world`,
        date: new Date()
    })
}

// ===========================================================================
// READ / DISPLAY

const createElementFromHTML = (htmlString) => {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

const createTodoElement = (todo, index) => {
    return createElementFromHTML(`
        <div data-id="todo-${index}" class="todo-item">
            ${todo.text}
            <span class="date badge badge-pill badge-light">
                ${moment(todo.date).calendar()}
            </span>
            <div class="btn-group">
                <button id="destroy-${index}" class="destroy btn btn-outline-light btn-sm" 
                title="Remove">
                    rm
                </button>
                <button id="update-${index}" class="update btn btn-outline-light btn-sm"
                title="Update">
                    mv
                </button>
            </div>
        </div>    
    `)
}

const display = () => {
    todoOutput.innerHTML = ""

    const todos = get()

    todos.forEach((todo, index) => {
        const todoElement = createTodoElement(todo, index)
        todoOutput.append(todoElement)
    })
}

// ===========================================================================
// CREATE

const create = (event) => {
    event.preventDefault()

    const todos = get()
    const todoInputText = document.getElementById("todo-input-text").value

    if (todoInputText) {
        todos.push({
            text: todoInputText,
            date: new Date()
        })
        set(todos);
        display();
    }
}

// ===========================================================================
// SEARCH

const search = (event) => {
    event.preventDefault()
}

// ===========================================================================
// DESTROY

const destroy = (event) => {
    if (event.target.matches(".destroy")) {
        const id = event.target.id.replace("destroy-", "");
        const todos = get();

        todos.splice(id, 1); // delete the object with specified index
        set(todos);
        display();
    }
}

// ===========================================================================
// LISTENERS

todoInputForm.addEventListener("submit", create)
todoSearchForm.addEventListener("submit", search)
todoOutput.addEventListener("click", destroy);
// todoOutput.addEventListener("click", update);

// ===========================================================================
// INITIALIZER

// SEEDER
seed(TODOS)

// INITIAL DISPLAY
display()