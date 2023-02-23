window.onload = () => {
  const __STORAGE_NAME = "ToDoStorage";
  const storageArr = localStorage.getItem(__STORAGE_NAME);
  const newArr = JSON.parse(storageArr);
  const list = document.querySelector(".todo__list-wrapper");
  const addBtn = document.querySelector(".todo__filter-add");
  const addWrapper = document.querySelector(".todo__add-wrapper");
  const addTodo = document.getElementById("addTodo");
  const text = document.getElementById("text");
  const colorPicker = document.getElementById("color");

  const todoWrapper = document.querySelector(".todo__wrapper");

  function render() {
    list.innerHTML = " ";
    if (
      localStorage.length == 0 ||
      !JSON.parse(localStorage.getItem(__STORAGE_NAME)).length
    ) {
      localStorage.setItem(__STORAGE_NAME, JSON.stringify([]));
    }

    console.log(!JSON.parse(localStorage.getItem(__STORAGE_NAME)).length);

    let storageArr = localStorage.getItem(__STORAGE_NAME);
    let newArr = JSON.parse(storageArr);
    if (localStorage.length != 0) {
      newArr.forEach((element) => {
        if (!list.classList.contains("hide")) {
          list.innerHTML += `
        <div class="todo__item" data-id="${element.id}" style="background-color:${element.color}"> 
            <span class="todo__item-text">${element.text}</span>
            <div class="todo__controls">
                <button class="todo__control todo__control-accept"></button>
                <button class="todo__control todo__control-delete"></button>
            </div>
        </div>
        `;
        }
      });
    }

    if (localStorage.length != 0) {
      const todoItemAll = document.querySelectorAll(".todo__item");
      todoItemAll.forEach((e) => {
        const deleteCurDataAll = e.querySelectorAll(".todo__control-delete");
        deleteCurDataAll.forEach((element) => {
          element.addEventListener("click", () => {
            const pos = newArr.map((e) => e.id);
            const indexId = pos.indexOf(
              +element.parentNode.parentNode.dataset.id
            );
            if (indexId == 0) {
              newArr.splice(0, 1);
              localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
              render();
            } else {
              newArr.splice(indexId, 1);
              localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
              render();
            }
          });
        });
      });
    }
  }

  function openAddField() {
    addWrapper.classList.toggle("active");
    list.classList.toggle("hide");
    if (addBtn.textContent == "Add") {
      addBtn.textContent = "Back";
      render();
    } else {
      addBtn.textContent = "Add";
      render();
    }
  }

  function addData() {
    const notification = document.querySelector(".todo__notification");
    const id = Date.now();
    let storage = localStorage.getItem(__STORAGE_NAME);
    if (storage) {
      storage = JSON.parse(storage);
    } else {
      storage = [];
    }
    let obj = {
      id,
      color: color.value,
      text: text.value,
    };
    console.log(color.value);
    localStorage.setItem(__STORAGE_NAME, JSON.stringify([...storage, obj]));
    render();
    notification.classList.add("active");

    setTimeout(() => {
      notification.classList.remove("active");
    }, 3000);
  }

  addBtn.addEventListener("click", () => {
    openAddField();
  });

  addTodo.addEventListener("click", () => {
    addData();
  });

  render();
};
