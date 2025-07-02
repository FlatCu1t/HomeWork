<script setup>
import { ref } from 'vue'
import Login from './components/LoginComponent.vue'

const bgColor = ref('#242424')

</script>

<template>
  <div class="main_container" :style="{ backgroundColor: bgColor }">
    <h2>Login!</h2>
    <Login />
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
