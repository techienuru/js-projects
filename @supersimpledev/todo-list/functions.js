export let todos = JSON.parse(localStorage.getItem("todos")) || [];

export function addTodoToArray(todoNameElement, todoDateElement) {
  todos.push({
    todoName: `${todoNameElement.value}`,
    todoDate: `${todoDateElement.value}`,
  });
  saveToLocalStorage();
}

export function renderTodo(todos) {
  let todosAccumulator = "";
  todos.forEach((todo, index) => {
    todosAccumulator += `
    <div class="row mt-5">
        <div class="col-sm">
            <p>${todo.todoName}</p>
        </div>
        <div class="col-sm">
            <p>${todo.todoDate}</p>
        </div>
        <div class="col-sm">
            <button type="button" class="btn btn-danger w-100 js-delete-todo" data-todo-id="${index}">Delete</button>
        </div>
    </div>
    `;
  });
  document.querySelector(".js-todos-wrapper").innerHTML = todosAccumulator;

  attachDeleteListeners();
}

export function clearInputBoxes(todoNameElement, todoDateElement) {
  todoNameElement.value = "";
  todoDateElement.value = "";
}

export function attachDeleteListeners() {
  document.querySelectorAll(".js-delete-todo").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      todos.splice(deleteBtn.dataset.todoId, 1);
      renderTodo(todos);
    });
  });
}

export function chkForErr(todoNameElement, todoDateElement) {
  if (!todoNameElement.value || !todoDateElement.value) {
    return true;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
