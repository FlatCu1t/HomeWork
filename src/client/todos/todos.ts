import "./todos.scss";

if (!localStorage || !localStorage.getItem("loginedLogin")) {
    window.location.assign("/auth");
}

(async () => {
    const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem("loginedLogin")}`, {
        method: "GET",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (!response.ok || response.status !== 200) {
        localStorage.clear();
        window.location.assign("/auth");
    } else {
        const data = await response.json();
        const userAvatar: any = document.getElementById("avatar");
        const userName: any = document.getElementById("userName");
        userAvatar.src = data.avatar;
        userName.textContent = data.login;
    }
})();

let currentTodoID: string | null = null;
const logOutButton = document.getElementById("logOutButton");
const modal = document.getElementById("todoModal")!;
const titleInput = document.getElementById("todoTitleInput") as HTMLInputElement;
const statusInput = document.getElementById("todoStatusInput") as HTMLSelectElement;
const closeModalBtn = document.getElementById("closeModalBtn")!;
const saveTodoBtn = document.getElementById("saveTodoBtn")!;
const deleteTodoBtn = document.getElementById("deleteTodoBtn")!;
const addTodoBtn = document.getElementById("addTodoButton");

closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

saveTodoBtn.addEventListener("click", async () => {
    const payload = {
        title: titleInput.value.trim(),
        isDone: statusInput.value === "true"
    };

    if (!payload.title) return alert("Введите название TODO");

    if (currentTodoID) {
        await fetch(`http://localhost:3000/api/users/Todos/update/${currentTodoID}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload)
        });
    } else {
        const login = localStorage.getItem("loginedLogin");
        if (!login) return;

        await fetch(`http://localhost:3000/api/users/Todos/create`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...payload, owner: login })
        });
    }

    modal.classList.add("hidden");
    await renderTodos();
});

deleteTodoBtn.addEventListener("click", async () => {
    if (!currentTodoID) return;

    await fetch(`http://localhost:3000/api/users/Todos/delete/${currentTodoID}`, {
        method: "DELETE"
    });

    modal.classList.add("hidden");
    await renderTodos();
});

addTodoBtn?.addEventListener("click", () => {
    currentTodoID = null;
    titleInput.value = "";
    statusInput.value = "false";
    modal.classList.remove("hidden");
});

logOutButton?.addEventListener("click", () => {
    localStorage.clear();
    window.location.assign("/auth");
});

function openTodoModal(todo: any) {
    currentTodoID = todo.todoID;
    titleInput.value = todo.todoTitle;
    statusInput.value = String(todo.todoIsDone);
    modal.classList.remove("hidden");
}

async function renderTodos() {
    const response = await fetch(`http://localhost:3000/api/users/getTodos/${localStorage.getItem("loginedLogin")}`, {
        method: "GET",
        headers: { "content-type": "application/json; charset=utf-8" }
    });

    if (response.ok && response.status === 200) {
        const data = await response.json();
        const todosContainer = document.getElementById("todosContainer");
        if (!todosContainer) return;

        todosContainer.innerHTML = "";

        if (data.length === 0) {
            todosContainer.innerHTML = "<p id=\"noTodos\">You don't have any todos.</p>";
            return;
        }

        data.forEach((todo: any) => {
            const todoElement = document.createElement("div");
            todoElement.classList.add("todo_item");
            todoElement.dataset.todoID = todo.todoID;

            const left = document.createElement("div");
            left.classList.add("todo_left");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.todoIsDone;
            checkbox.disabled = true;
            checkbox.classList.add("todo_checkbox");

            const title = document.createElement("span");
            title.classList.add("todo_title");
            title.textContent = todo.todoTitle;

            left.appendChild(checkbox);
            left.appendChild(title);

            const status = document.createElement("span");
            status.classList.add("todo_status");
            status.textContent = todo.todoIsDone ? "Выполнено" : "В процессе";
            status.classList.add(todo.todoIsDone ? "done" : "pending");

            todoElement.appendChild(left);
            todoElement.appendChild(status);
            todosContainer.appendChild(todoElement);
            todoElement.addEventListener("click", () => openTodoModal(todo));
        });
    }
}

(async () => {
    await renderTodos();
})();