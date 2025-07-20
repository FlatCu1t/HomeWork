<template>
    <div v-if="loading" class="loading">Загрузка постов...</div>
    <div v-else>
        <h2>Посты</h2>
        <input type="text" v-model="search" placeholder="Поиск по заголовку...">
        <div class="posts_container">
            <Post v-for="post in paginatedPosts" :key="post.id" :post="post"/>
        </div>
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
            <span>Страница {{ currentPage }} из {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Вперёд</button>
        </div>
        <div v-if="paginatedPosts.length === 0" class="not-found">Ничего не найдено</div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Post from './Post.vue';

const posts = ref([]);
const loading = ref(true);
const search = ref('');
const currentPage = ref(1);
const perPage = 5;

onMounted(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts.value = await res.json();
    loading.value = false;
});

const filteredPosts = computed(() => {
    const term = search.value.trim().toLowerCase();
    return posts.value.filter(post => post.title.toLowerCase().includes(term));
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / perPage));

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredPosts.value.slice(start, start + perPage);
});

const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; }
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; }

watch(search, () => currentPage.value = 1);
</script>

<style scoped>
h2 {
    text-align: center;
    margin-top: 50px;
}
input {
    display: block;
    margin: 20px auto;
    width: 300px;
    height: 40px;
    font-size: 18px;
    padding-left: 10px;
    border-radius: 7px;
    border: 1px solid black;
}
.posts_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}
.pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
.loading, .not-found {
    text-align: center;
    font-size: 28px;
    margin-top: 200px;
}
button {
    cursor: pointer;
}
</style>