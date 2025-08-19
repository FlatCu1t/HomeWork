<template>
  <div v-if="favorites.length" class="favorites">
    <h2>Избранные задачи</h2>
    <ul>
      <TaskItem
        v-for="task in favorites"
        :key="task.id"
        :task="task"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'

const store = useStore()
const favorites = computed(() => store.getters['favorites/favoriteTasks'])
</script>