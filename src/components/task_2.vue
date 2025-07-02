<script setup>
import { ref } from 'vue'

const likes = ref(0);
const clicks = ref(0);

</script>

<template>
  <div class="card">
    <button @click="likes++, clicks++" type="button">+</button>
    <button @click="likes--, clicks++" :disabled="likes < 1" :style="{ cursor: likes < 1 ? 'not-allowed' : 'pointer' }" type="button">-</button>
    <p>Количество лайков: {{ likes }}</p>
    <p>Количество Нажатий: {{ clicks }}</p>
  </div>
</template>

<style scoped>
  button {
    font-size: 18px;
    font-weight: 600;
  }
</style>
