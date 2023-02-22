const list = document.querySelector(".todo__list-wrapper");
const addBtn = document.querySelector(".todo__filter-add");
const addWrapper = document.querySelector(".todo__add-wrapper");

if (localStorage.length != 0) {
  for (let i = 0; i <= localStorage.length; i++) {
    let text = JSON.parse(localStorage.getItem(i + 1));
    list.innerHTML += `
      <div class="todo__item">
          <span class="todo__item-text">${text.text}</span>
          <div class="todo__controls">
              <button class="todo__control todo__control-accept"></button>
              <button class="todo__control todo__control-delete"></button>
          </div>
      </div>
      `;
  }
}

addBtn.addEventListener("click", () => {
  addWrapper.classList.toggle("active");
  list.classList.toggle("hide");
  if (addBtn.textContent == "Add") {
    addBtn.textContent = "Back";
  } else {
    addBtn.textContent = "Add";
  }
});

const addTodo = document.getElementById("addTodo");
const text = document.getElementById("text");

addTodo.addEventListener("click", () => {
  let obj = {
    text: text.value,
  };
  localStorage.setItem(localStorage.length + 1, JSON.stringify(obj));
});

if (localStorage.length == 0) {
  list.innerHTML = "<h1>Todo List is Empty, add your first todo</h1>";
}
