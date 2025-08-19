<template>
  <div class="stats">
    Всего задач: {{ total }} |
    Выполнено: {{ completed }} |
    В избранном: {{ favCount }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const total = computed(() => store.getters['tasks/totalCount'])
const completed = computed(() => store.getters['tasks/completedCount'])
const favCount = computed(() => store.state.favorites.ids.length)
</script>