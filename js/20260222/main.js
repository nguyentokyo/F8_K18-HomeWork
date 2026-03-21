// task 1
const addParagraphBtn = document.getElementById("add-paragraph-btn");
const paragraphContainer  = document.getElementById("paragraph-container");

addParagraphBtn.addEventListener("click", function() {
    const paragraph= document.createElement("p");
    paragraph.textContent = "Hello DOM"

    paragraphContainer.appendChild(paragraph);
})

//task2
const addItemBtn = document.getElementById("add-item-btn");
const itemContainer = document.getElementById("item-container");
let itemCount = 1;

addItemBtn.addEventListener("click", function() {
    const listItem = document.createElement("li");

    listItem.textContent = "Item " + itemCount

    itemContainer.appendChild(listItem);

    itemCount = itemCount + 1;
})

//task3
const addTextBtn = document.getElementById("add-text-btn");
const taskInput = document.getElementById("task-input");
const textResult = document.getElementById("text-result");

addTextBtn.addEventListener("click", function() {

    const paragraph = document.createElement("p");

    console.log(taskInput.value);

    paragraph.textContent = taskInput.value;

    textResult.appendChild(paragraph);

    // clear
    taskInput.value = "";
})

//task4 task5 task6 task7
const addTodoBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");

addTodoBtn.addEventListener("click", function() {
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        errorMessage.textContent = "Please enter a task";
        return;
    }
    errorMessage.textContent = "";

    //item add
    const listItem = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = todoText;

    //task07 click text → change =====
    textSpan.addEventListener("click", (e) => {
        e.stopPropagation();
        textSpan.classList.toggle("done");

        if (listItem.style.color === "red") {
            listItem.style.color = "";
        } else {
            listItem.style.color = "red";
        }
    });

    // //task05 click item change color
    // listItem.addEventListener("click", function() {
    //     if (listItem.style.color === "red") {
    //         listItem.style.color = "black";
    //     } else {
    //         listItem.style.color = "red";
    //     }
    // })

    //task06 click delete item
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        listItem.remove();
    });

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    // clear
    todoInput.value = "";
})

//task08
const addTodoBtn08 = document.getElementById("add-todo-btn-08");
const todoInput08 = document.getElementById("todo-input-08");
const todoList08 = document.getElementById("todo-list-08");
const errorMessage08 = document.getElementById("error-message-08");

let selectedItem08 = null;

addTodoBtn08.addEventListener("click", function () {
    const todoText = todoInput08.value.trim();

    if (todoText === "") {
        errorMessage08.textContent = "Please enter a task";
        return;
    }

    errorMessage08.textContent = "";

    const li = document.createElement("li");
    li.textContent = todoText;

    li.addEventListener("click", () => {
        if (selectedItem08 && selectedItem08 !== li) {
            selectedItem08.style.backgroundColor = "";
        }

        li.style.backgroundColor = "lightblue";

        selectedItem08 = li;
    });

    todoList08.appendChild(li);
    todoInput08.value = "";
});

const addBtn = document.getElementById("add-btn-09");
const input = document.getElementById("todo-input-09");
const list = document.getElementById("todo-list-09");
const searchInput = document.getElementById("search-input-09");
const filterDone = document.getElementById("filter-done-09");

let todos = [];

addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    const todo = {
        id: Date.now(),
        text: text,
        done: false
    };

    todos.push(todo);
    render();

    input.value = "";
});

// render list
function render() {
    list.innerHTML = "";

    const keyword = searchInput.value.toLowerCase();
    const isFilterDone = filterDone.checked;

    const filtered = todos.filter(todo => {
        const matchText = todo.text.toLowerCase().includes(keyword);
        const matchDone = !isFilterDone || todo.done;
        return matchText && matchDone;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");

        // text
        const span = document.createElement("span");
        span.textContent = todo.text;

        // done button
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.style.marginLeft = "10px";
        doneBtn.style.backgroundColor = todo.done ? "green" : "yellow";

        doneBtn.addEventListener("click", () => {
            todo.done = !todo.done;
            render();
        });

        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "5px";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white";

        deleteBtn.addEventListener("click", () => {
            todos = todos.filter(t => t.id !== todo.id);
            render();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// search realtime
searchInput.addEventListener("input", render);

// filter checkbox
filterDone.addEventListener("change", render);