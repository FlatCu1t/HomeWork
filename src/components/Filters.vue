<template>
  <div class="filters">
    <button
      v-for="f in filters"
      :key="f.value"
      :class="{ active: current === f.value }"
      @click="setFilter(f.value)"
    >
      {{ f.label }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Выполненные', value: 'completed' },
  { label: 'Невыполненные', value: 'uncompleted' }
]
const current = computed(() => store.state.tasks.filter)
function setFilter(value) {
  store.dispatch('tasks/setFilter', value)
}
</script>