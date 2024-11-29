import {
  addTodoToArray,
  chkForErr,
  clearInputBoxes,
  renderTodo,
  todos,
} from "./functions.js";

renderTodo(todos); // Display all todo stored in localstorage

const todoNameElement = document.querySelector(".js-todo-name");
const todoDateElement = document.querySelector(".js-todo-date");
const AddBtnElement = document.querySelector(".js-add-btn");

// If user clicks "add" button
AddBtnElement.addEventListener("click", () => {
  // Checks if Input boxes are not empty
  if (!chkForErr(todoNameElement, todoDateElement)) {
    addTodoToArray(todoNameElement, todoDateElement);
    clearInputBoxes(todoNameElement, todoDateElement);
    renderTodo(todos); //Update the UI
  } else {
    window.alert("Todo can't be empty, please!");
  }
});
