<template>
  <ul>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'

const store = useStore()
const tasks = computed(() => store.getters['tasks/filteredTasks'])
</script>