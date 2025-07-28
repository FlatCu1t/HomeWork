<template>
  <li>
    <input type="checkbox" :checked="task.completed" @change="toggleComplete" />
    <span :class="{ done: task.completed }">{{ task.title }}</span>
    <button @click="toggleFav">
      {{ isFav ? '★' : '☆' }}
    </button>
    <button @click="deleteTask">🗑</button>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { toRefs } from 'vue'

const props = defineProps({
  task: Object
})
const { task } = toRefs(props)
const store = useStore()

const isFav = computed(() => store.state.favorites.ids.includes(task.value.id))

function toggleComplete() {
  store.dispatch('tasks/toggleComplete', task.value.id)
}
function deleteTask() {
  store.dispatch('tasks/deleteTask', task.value.id)
}
function toggleFav() {
  store.dispatch('favorites/toggleFavorite', task.value.id)
}
</script>

<style>
.done { text-decoration: line-through; }
li { display: flex; align-items: center; gap: 0.5em; }
</style>