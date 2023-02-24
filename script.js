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
  const crossBtn = document.querySelector(".todo__add-close");
  const todoWrapper = document.querySelector(".todo__wrapper");
  const allBtn = document.querySelector(".todo__filter-all");
  const completedBtn = document.querySelector(".todo__filter-completed");
  const expectBtn = document.querySelector(".todo__filter-expect");

  function render() {
    list.innerHTML = " ";
    if (
      localStorage.length == 0 ||
      !JSON.parse(localStorage.getItem(__STORAGE_NAME)).length
    ) {
      localStorage.setItem(__STORAGE_NAME, JSON.stringify([]));
    }

    let storageArr = localStorage.getItem(__STORAGE_NAME);
    let newArr = JSON.parse(storageArr);
    if (localStorage.length != 0) {
      newArr.forEach((element) => {
        if (!list.classList.contains("hide")) {
          list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}"> 
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

    allBtn.addEventListener("click", () => {
      list.innerHTML = "";
      newArr.forEach((element) => {
        if (!list.classList.contains("hide")) {
          list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept"></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
        }
      });
    });

    completedBtn.addEventListener("click", () => {
      list.innerHTML = "";
      newArr.forEach((element) => {
        if (!list.classList.contains("hide")) {
          if (element.status == "completed") {
            list.innerHTML += `
              <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}"> 
                  <span class="todo__item-text">${element.text}</span>
                  <div class="todo__controls">
                      <button class="todo__control todo__control-accept"></button>
                      <button class="todo__control todo__control-delete"></button>
                  </div>
              </div>
              `;
          }
        }
      });
    });

    expectBtn.addEventListener("click", () => {
      list.innerHTML = "";
      newArr.forEach((element) => {
        if (!list.classList.contains("hide")) {
          if (element.status == "expect") {
            list.innerHTML += `
              <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}"> 
                  <span class="todo__item-text">${element.text}</span>
                  <div class="todo__controls">
                      <button class="todo__control todo__control-accept"></button>
                      <button class="todo__control todo__control-delete"></button>
                  </div>
              </div>
              `;
          }
        }
      });
    });

    if (localStorage.length != 0) {
      const todoItemAll = document.querySelectorAll(".todo__item");
      todoItemAll.forEach((e) => {
        const deleteCurDataAll = e.querySelectorAll(".todo__control-delete");
        deleteCurDataAll.forEach((element) => {
          element.addEventListener("click", () => {
            console.log(element);
            const pos = newArr.map((e) => e.id);
            const indexId = pos.indexOf(
              +element.parentNode.parentNode.dataset.id
            );
            if (indexId == 0) {
              e.classList.add("delete");
              setTimeout(() => {
                e.classList.remove("delete");
                newArr.splice(0, 1);
                localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
                render();
              }, 200);
            } else {
              e.classList.add("delete");
              setTimeout(() => {
                newArr.splice(indexId, 1);
                localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
                e.classList.remove("delete");
                render();
              }, 200);
            }
          });
        });
      });
    }
  }

  function openAddField() {
    addWrapper.classList.toggle("active");
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
    const textNotification = notification.querySelector(
      ".todo__notification-text"
    );
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
      status: "expect",
    };

    if (text.value) {
      localStorage.setItem(__STORAGE_NAME, JSON.stringify([...storage, obj]));
      render();
      notification.classList.add("active");
      notification.style.backgroundColor = "rgb(87, 183, 87)";
      textNotification.textContent = "Todo was successfully added";
      setTimeout(() => {
        notification.classList.remove("active");
      }, 3000);
    } else {
      notification.classList.add("active");
      notification.style.backgroundColor = "rgb(238, 31, 31)";
      textNotification.textContent = "Todo was not created, please enter text";
      setTimeout(() => {
        notification.classList.remove("active");
      }, 3000);
    }
  }

  addBtn.addEventListener("click", () => {
    openAddField();
  });

  addTodo.addEventListener("click", () => {
    addData();
    addTodo.disabled = "true";
    setTimeout(() => {
      addTodo.disabled = false;
    }, 3000);
  });

  crossBtn.addEventListener("click", () => {
    openAddField();
  });
  render();
};
