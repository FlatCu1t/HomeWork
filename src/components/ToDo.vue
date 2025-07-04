<script setup>
    import { ref } from 'vue';
    const todoText = ref('');
    const todoEditText = ref('');
    const isEditing = ref({ editing: false, todo: 0 });
    const todos = ref([]);
    const todoIDCounter = ref(1);

    function addTodo() {
        if (todoText.value && todoText.value.length > 0) {
            todos.value.push({
                id: todoIDCounter.value,
                text: todoText.value,
                done: false
            })

            todoIDCounter.value++
            todoText.value = ''
        }
    }

    function removeTodo(id) {
        const findedTodo = todos.value.find((x) => x.id == id);
        if (findedTodo) {
            todos.value = todos.value.filter((x) => x.id !== id);
        }
    }

    function TodoDone(ID) {
        const findedTodo = todos.value.find((x) => x.id == ID);
        if (findedTodo) {
            findedTodo.done == false ? findedTodo.done = true : findedTodo.done = false;
        }
    }

    function editTodo(ID) {
        if (isEditing.value.editing) return;
        const findedTodo = todos.value.find((x) => x.id == ID);
        if (findedTodo) {
            isEditing.value.editing = true;
            isEditing.value.todo = findedTodo.id;
            todoEditText.value = findedTodo.text;
        }
    }

    function endEditTodo(ID) {
        if (!isEditing.value.editing || isEditing.value.todo !== ID) return;
        const findedTodo = todos.value.find((x) => x.id == ID);

        if (findedTodo) {
            findedTodo.text = todoEditText.value
        }

        isEditing.value.editing = false;
        isEditing.value.todo = 0;
        todoEditText.value = '';
    }

    function buttonEndEditTodo() {
        if (!isEditing.value.editing) return;
        const findedTodo = todos.value.find((x) => x.id == isEditing.value.todo);

        if (findedTodo) {
            findedTodo.text = todoEditText.value
        }

        isEditing.value.editing = false;
        isEditing.value.todo = 0;
        todoEditText.value = '';
    }
</script>

<template>
    <h2>Todo List</h2>
    <div class="todos_container">
        <div v-for="todo in todos" class="todo">
            <p class="todo_title">{{ `Todo #${todo.id}` }}</p>
            <br>
            <p v-if="!isEditing.editing" @click="editTodo(todo.id)" class="todo_text" :style="{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? 'rgba(255, 255, 255, 0.5)' : 'white' }">{{ todo.text }}</p>
            <p v-else @click="endEditTodo(todo.id)" :style="{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? 'rgba(255, 255, 255, 0.5)' : 'white' }">{{ isEditing.editing && isEditing.todo == todo.id ? `${todoEditText} (Editing...)` : todo.text }}</p>
            <button v-if="!isEditing.editing" type="button" @click="editTodo(todo.id)">{{ isEditing.todo == todo.id ? 'Закончить изменение' : 'Изменить' }}</button>
            <button v-else type="button" @click="endEditTodo(todo.id)">{{ isEditing.todo == todo.id ? 'Закончить изменение' : 'Изменить' }}</button>
            <button type="button" @click="removeTodo(todo.id)">Удалить</button>
            <div class="todo_check_container">
                <input :disabled="isEditing.editing && isEditing.todo == todo.id" class="todo_check" @click="TodoDone(todo.id)" type="checkbox">
                <span v-if="todo.done" class="todo_done">Выполнено</span>
                <span v-else class="todo_notDone">Не выполнено</span>
            </div>
        </div>
    </div>
    <h2>Настройки TODO</h2>
    <div class="settings_container">
        <br>
        <textarea v-if="!isEditing.editing" placeholder="Текст задачи" v-model="todoText"></textarea>
        <textarea v-else placeholder="Текст задачи" v-model="todoEditText"></textarea>
        <button v-if="!isEditing.editing" type="button" @click="addTodo()">Добавить задачу</button>
        <button v-else type="button" @click="buttonEndEditTodo()">Изменить задачу</button>
    </div>
</template>

<style scoped>
    h2 {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
        font-size: 32px;
        font-weight: 600;
    }

    .todos_container {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 50px;
        row-gap: 30px;
        max-height: 800px;
        min-width: 450px;
        min-height: 650px;
        overflow-y: auto;
    }

    .todos_container .todo {
        min-width: 300px;
        max-width: max-content;
        max-height: max-content;
        background-color: #1a1a1a;
        border-radius: 12px;
        transition: transform 0.35s ease-in-out;
        overflow: hidden;
        padding: 15px;

        &:hover {
            transform: scale(1.05);
        }
    }

    .todos_container .todo .todo_title {
        position: relative;
        font-size: 20px;
        font-weight: 600;
    }

    .todos_container .todo p {
        position: relative;
        font-size: 18px;
        font-weight: 500;
        max-width: 350px;
        text-align: left;
        cursor: pointer;
    }

    .todos_container .todo button {
        border: 1px solid white;
        transition: border 0.35s ease-in-out, border-color 0.35s ease-in-out, box-shadow 0.35s ease-in-out;

        &:hover {
            cursor: pointer;
            border: 1px solid transparent;
            border-color: #646cff;
            box-shadow: 0px 0px 12px 2px rgba(100, 108, 255, 0.4);
        }
    }

    .todo_check_container .todo_check {
        width: 16px;
        height: 16px;
        border-radius: 15px;
        margin-right: 10px;

        &:hover {
            cursor: pointer;
        }
    }

    .todo_check_container span {
        font-size: 18px;
        font-weight: 400;
    }

    .settings_container {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        bottom: -70px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 30px;
        align-items: center;
        justify-content: center;
    }

    .settings_container button {
        align-self: flex-start;
        justify-self: flex-start;
    }

    textarea {
        width: 300px;
        height: 100px;
        resize: none;
        margin-bottom: 100px;
        border: 1px solid transparent;
        transition: box-shadow 0.35s ease-in-out, border-color 0.35s ease-in-out;
        font-size: 18px;
        font-weight: 500;
        padding: 10px;
        border-radius: 7px;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.4);

        &:hover {
            box-shadow: 0px 0px 12px 2px rgba(100, 108, 255, 0.4);
            border-color: #646cff;
        }

        &:focus {
            outline: none;
            box-shadow: 0px 0px 12px 2px rgba(100, 108, 255, 0.4);
            border-color: #646cff;
        }
    }

    .todo_done {
        background-color: rgb(33, 76, 33);
        color: rgb(74, 151, 74);
        font-weight: 600;
        font-size: 18px;
        border-radius: 12px;
        padding: 5px;
    }

    .todo_notDone {
        background-color: rgb(76, 33, 33);
        color: rgb(151, 74, 74);
        font-weight: 600;
        font-size: 18px;
        border-radius: 12px;
        padding: 5px;
    }
</style>