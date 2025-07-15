const textarea = document.querySelector('textarea');
const addBtn = document.getElementById('addBtn');
const todoContainer = document.querySelector('.todo-container');
const todoCount = document.querySelector('.todo-count');

let todoList = [];

function initialLoad() {
    if (!localStorage.getItem('todos')) { return; }
    todoList = JSON.parse(localStorage.getItem('todos')).todoList;
    updateUI();
}

initialLoad();

function addTodo() {
    const todo = textarea.value.trim();
    if (!todo) { return; }

    console.log('Added todo: ', todo);
    todoList.push(todo);
    textarea.value = '';
    updateUI();
}

function editTodo(index) {
    textarea.value = todoList[index];
    textarea.focus();
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) { return false; }
        return true;
    });
    updateUI();
}

function deleteTodo(index) {
    const todoElement = document.querySelectorAll('.todo')[index];
    todoElement.classList.add('todo-removing');
    
    setTimeout(() => {
        todoList = todoList.filter((element, elementIndex) => {
            if (index === elementIndex) { return false; }
            return true;
        });
        updateUI();
    }, 400);
}

function updateUI() {
    todoCount.textContent = todoList.length;

    if (todoList.length === 0) {
        todoContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-check"></i>
                <h3>No tasks yet</h3>
                <p>Add your first task above to get started!</p>
            </div>
        `;
        return;
    }

    let newInnerHTML = '';
    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
            <div class="todo">
                <p>${todoElement}</p>
                <div class="todo-actions">
                    <button class="icon-btn edit-btn" onclick="editTodo(${todoIndex})" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn delete-btn" onclick="deleteTodo(${todoIndex})" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    todoContainer.innerHTML = newInnerHTML;

    localStorage.setItem('todos', JSON.stringify({ todoList }));
}

addBtn.addEventListener('click', addTodo);

textarea.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addTodo();
    }
});


textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});