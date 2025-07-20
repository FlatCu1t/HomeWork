<template>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else>
        <h2>Поиск пользователей</h2>
        <input type="text" placeholder="Поиск..." v-model="search">
        <select v-model="searchCompany">
            <option value="all">Все компании</option>
            <option v-for="company in companies" :key="company" :value="company">{{ company }}</option>
        </select>
        <button @click="toggleSort" class="sort_button">
            Сортировка: {{ sortOrder === 'asc' ? 'A-Z' : 'Z-A' }}
        </button>
        <div class="users_container">
            <User v-for="user in filteredUsers" :key="user.id" class="user" :user="user"/>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import User from './User.vue'
const companies = new Set();
const searchCompany = ref('all');
const search = ref('');
const users = ref([]);
const loading = ref(true);
const sortOrder = ref("asc");

const toggleSort = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

onMounted(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
        companies.add(data[i].company.name)
    }

    users.value = data;
    loading.value = false;
});

const filteredUsers = computed(() => {
    const term = search.value.trim().toLowerCase();
    const termCompany = searchCompany.value.trim().toLowerCase();

    let filtered = users.value.filter(user => {
        const matchesSearch = term === '' || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
        const matchesCompany = termCompany === 'all' || user.company.name.toLowerCase().includes(termCompany);
        return matchesSearch && matchesCompany;
    });

    filtered.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortOrder.value === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });

    return filtered;
});

</script>

<style scoped>
h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    font-size: 32px;
}

input {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 180px;
    padding-left: 10px;
    width: 300px;
    height: 40px;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 7px;
}

select {
    position: absolute;
    left: 65%;
    transform: translateX(-65%);
    top: 185px;
    width: 150px;
    height: 30px;
    border-radius: 7px;

    &:hover {
        cursor: pointer;
    }
}

.users_container {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 300px;
    width: max-content;
    height: max-content;
    max-width: 95%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 50px;
    align-items: center;
    justify-content: center;
}

.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    font-weight: 600;
}

.user {
    position: relative;
    width: 300px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 7px;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.4);
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 30px;
    align-items: center;
    justify-content: flex-start;
}

.sort_button {
    position: absolute;
    left: 80%;
    transform: translateX(-80%);
    top: 185px;
    width: 150px;
    height: 35px;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
}
</style>