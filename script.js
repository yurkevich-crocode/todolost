window.onload = () => {
  let status = "";

  const __STORAGE_NAME = "ToDoStorage";
  const list = document.querySelector(".todo__list-wrapper");
  const addBtn = document.querySelector(".todo__filter-add");
  const addWrapper = document.querySelector(".todo__add-wrapper");
  const addTodo = document.getElementById("addTodo");
  const text = document.getElementById("text");
  const crossBtn = document.querySelector(".todo__add-close");
  const allBtn = document.querySelector(".todo__filter-all");
  const searchBtn = document.querySelector(".search__btn");
  const completedBtn = document.querySelector(".todo__filter-completed");
  const expectBtn = document.querySelector(".todo__filter-expect");
  const todoWarning = document.querySelector(".todo__warning");
  const searchInput = document.getElementById("searchBar");

  allBtn.classList.add("filter");

  function render(status) {
    const storageArr = localStorage.getItem(__STORAGE_NAME);

    list.innerHTML = " ";
    if (
      localStorage.length == 0 ||
      !JSON.parse(localStorage.getItem(__STORAGE_NAME)).length
    ) {
      localStorage.setItem(__STORAGE_NAME, JSON.stringify([]));
    }

    if (localStorage.length != 0) {
      let newArr = JSON.parse(storageArr);
      list.innerHTML = "";
      newArr.forEach((element) => {
        if (status == "") {
          if (element.status == "completed") {
            list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}" draggable="true"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept" disabled></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
          } else {
            list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}" draggable="true"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept"></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
          }
        }

        if (status == "completed") {
          if (element.status == "completed") {
            list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color}" data-status="${element.status}"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept" disabled></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
          } else {
            list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color};display:none" data-status="${element.status}"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept"></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
          }
        }

        if (status == "expect") {
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
          } else {
            list.innerHTML += `
            <div class="todo__item" data-id="${element.id}" style="--label-color:${element.color};display:none" data-status="${element.status}"> 
                <span class="todo__item-text">${element.text}</span>
                <div class="todo__controls">
                    <button class="todo__control todo__control-accept"></button>
                    <button class="todo__control todo__control-delete"></button>
                </div>
            </div>
            `;
          }
        }

        deleteItem(newArr);
        completedItem(newArr);
        dragElem();
      });
    }

    if (!JSON.parse(localStorage.getItem(__STORAGE_NAME)).length) {
      todoWarning.style.display = "block";
      todoWarning.textContent = "todo list is empty";
    } else {
      todoWarning.style.display = "none";
    }
  }

  function dragElem() {
    const todoAllItems = document.querySelectorAll(".todo__item");
    todoAllItems.forEach((item) => {
      item.onmousedown = function (event) {
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        console.log(item.offsetWidth);

        console.log(item.getBoundingClientRect().left);
        item.style.transition = "none";
        // alert(shiftX);

        function moveAt(pageX) {
          item.style.left = pageX - item.offsetWidth / shiftX + "px";
        }

        function onMouseMove(event) {
          moveAt(event.pageX);
        }

        document.addEventListener("mousemove", onMouseMove);
        moveAt(event.pageX);

        item.onmouseup = function () {
          item.onmouseup = null;
          item.style.left = "0";
          item.style.transition = "0.2s ease";
          document.removeEventListener("mousemove", onMouseMove);
        };
      };

      item.ondragstart = function () {
        return false;
      };
    });
  }

  function openAddField() {
    addWrapper.classList.toggle("active");
    if (addBtn.textContent == "Add") {
      addBtn.textContent = "Back";
      render(status);
    } else {
      addBtn.textContent = "Add";
      render(status);
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
      render(status);
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

  function deleteItem(newArr) {
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
            e.classList.add("delete");
            setTimeout(() => {
              e.classList.remove("delete");
              newArr.splice(0, 1);
              localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
              render(status);
            }, 200);
          } else {
            e.classList.add("delete");
            setTimeout(() => {
              newArr.splice(indexId, 1);
              localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
              e.classList.remove("delete");
              render(status);
            }, 200);
          }
        });
      });
    });
  }

  function completedItem(newArr) {
    const todoItemAll = document.querySelectorAll(".todo__item");
    todoItemAll.forEach((e) => {
      const acceptCurDataAll = e.querySelectorAll(".todo__control-accept");
      acceptCurDataAll.forEach((element) => {
        element.addEventListener("click", () => {
          const pos = newArr.map((e) => e.id);
          const indexId = pos.indexOf(
            +element.parentNode.parentNode.dataset.id
          );
          console.log(newArr[indexId].status);
          if (newArr[indexId].status != "completed") {
            if (indexId == 0) {
              if (status == "expect") {
                e.classList.add("delete");
              }
              setTimeout(() => {
                newArr[indexId].status = "completed";
                console.log(newArr[indexId].status);
                localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
                e.classList.remove("delete");
                render(status);
              }, 200);
            } else {
              if (status == "expect") {
                e.classList.add("delete");
              }
              setTimeout(() => {
                newArr[indexId].status = "completed";
                localStorage.setItem(__STORAGE_NAME, JSON.stringify(newArr));
                e.classList.remove("delete");
                render(status);
              }, 200);
            }
          }
        });
      });
    });
  }

  function search() {
    let val = searchInput.value.trim();
    let todoItems = document.querySelectorAll(".todo__item");
    if (val != " ") {
      todoItems.forEach((e) => {
        if (e.innerText.search(val) == -1) {
          e.classList.add("delete");
          setTimeout(() => {
            e.classList.add("hide");
          }, 100);
        } else {
          e.classList.remove("delete");
          setTimeout(() => {
            e.classList.remove("hide");
          }, 100);
        }
      });
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

  allBtn.addEventListener("click", () => {
    allBtn.classList.add("filter");
    if (completedBtn.classList.contains("filter")) {
      completedBtn.classList.remove("filter");
    }
    if (expectBtn.classList.contains("filter")) {
      expectBtn.classList.remove("filter");
    }
    status = "";
    render("");
  });

  completedBtn.addEventListener("click", () => {
    completedBtn.classList.add("filter");
    if (allBtn.classList.contains("filter")) {
      allBtn.classList.remove("filter");
    }
    if (expectBtn.classList.contains("filter")) {
      expectBtn.classList.remove("filter");
    }
    status = "completed";
    render("completed");
  });

  expectBtn.addEventListener("click", () => {
    expectBtn.classList.add("filter");
    if (allBtn.classList.contains("filter")) {
      allBtn.classList.remove("filter");
    }
    if (completedBtn.classList.contains("filter")) {
      completedBtn.classList.remove("filter");
    }
    status = "expect";
    render("expect");
  });

  searchInput.addEventListener("input", () => {
    search();
  });

  render("");
};
