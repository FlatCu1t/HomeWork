<script setup>
import { ref } from 'vue'
import Task_1 from './components/task_1.vue'
import Task_2 from './components/task_2.vue'
import Task_3 from './components/task_3.vue'

const bgColor = ref('#242424')

</script>

<template>
  <div class="main_container" :style="{ backgroundColor: bgColor }">
    <Task_1 msg="Hello, world!" />
    <Task_2 />
    <Task_3 />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
