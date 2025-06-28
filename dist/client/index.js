var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import './index.scss';
document.addEventListener('DOMContentLoaded', () => {
    const api = '/api/users';
    const listEl = document.getElementById('user-list');
    const searchEl = document.getElementById('search');
    const formContainer = document.getElementById('form-container');
    const formEl = document.getElementById('user-form');
    const addBtn = document.getElementById('add-user-btn');
    let editId = null;
    const fetchUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (search = '') {
        const res = yield fetch(`${api}?search=${search}`);
        const users = yield res.json();
        listEl.innerHTML = '';
        users.forEach((u) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${u.avatar || 'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'}" alt="Avatar">
        <h3>${u.name}</h3>
        <p>${u.username}</p>
        <p>${u.email}</p>
        <p>${u.phone}</p>
        <button data-id="${u._id}" class="edit">Edit</button>
        <button data-id="${u._id}" class="delete">Delete</button>
      `;
            listEl.appendChild(card);
        });
    });
    searchEl.addEventListener('input', () => fetchUsers(searchEl.value));
    addBtn.addEventListener('click', () => {
        editId = null;
        formEl.reset();
        formContainer.classList.toggle('hidden');
    });
    listEl.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const target = e.target;
        const id = target.getAttribute('data-id');
        if (!id)
            return;
        if (target.classList.contains('delete')) {
            yield fetch(`${api}/${id}`, { method: 'DELETE' });
            fetchUsers(searchEl.value);
        }
        if (target.classList.contains('edit')) {
            const res = yield fetch(`${api}/${id}`);
            const user = yield res.json();
            Object.entries(user).forEach(([k, v]) => {
                if (formEl.elements.namedItem(k)) {
                    formEl.elements.namedItem(k).value = v;
                }
            });
            editId = id;
            formContainer.classList.remove('hidden');
        }
    }));
    formEl.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(formEl);
        const data = Object.fromEntries(formData.entries());
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${api}/${editId}` : api;
        yield fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        formContainer.classList.add('hidden');
        fetchUsers(searchEl.value);
    }));
    fetchUsers();
});
