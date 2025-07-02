<script setup>
import { ref } from 'vue'

const numbers = ref([]);

function getRandomNumber(x, y) {
  if (x > y || numbers.value.length >= y) return;
  const number = y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
  if (!numbers.value.includes(number)) {
    numbers.value.push(number)
  } else {
    getRandomNumber(x, y)
  }
}

</script>

<template>
  <div class="card">
    <button @click="getRandomNumber(1, 100)" type="button">Получить случайное число</button>
    <p>Числа:<br><br>{{ numbers }}</p>
  </div>
</template>

<style scoped>
  p {
    font-size: 24px;
    font-weight: 500;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    max-width: 800px;
    line-height: 40px;
  }
</style>
