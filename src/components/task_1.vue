<script setup>
import { ref } from 'vue'

const props = defineProps(['msg'])
const user = ref({
  name: "Vlad",
  age: 21,
  isAdmin: true
});

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p>Имя: {{ user.name }}</p>
    <p>Возраст: {{ user.age }}</p>
    <p v-if="user.isAdmin">Пользователь является администратором</p>
    <p v-else>Пользователь не является администратором</p>
  </div>
</template>

<style scoped>
  p {
    font-size: 20px;
    font-weight: 400;
  }
</style>
