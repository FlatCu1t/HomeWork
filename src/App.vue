<template>
  <div class="container">
    <h1>Менеджер задач</h1>
    <Stats />
    <Filters />
    <TaskList />
    <FavoriteTasks />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Stats from './components/Stats.vue'
import Filters from './components/Filters.vue'
import TaskList from './components/TaskList.vue'
import FavoriteTasks from './components/FavoriteTasks.vue'

const store = useStore()
onMounted(() => {
  store.dispatch('tasks/fetchTasks')
})
</script>

<style>
.container { max-width: 600px; margin: auto; padding: 1rem; }
</style>