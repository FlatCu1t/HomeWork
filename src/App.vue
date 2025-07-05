<script setup>
import { ref } from 'vue'
import Container from './components/task_1/Container.vue'
import Form from './components/task_2/Form.vue'
import Colors from './components/task_3/Colors.vue'
import Text from './components/task_4/Text.vue'

const bgColor = ref('#242424')
const currentTask = ref(1);

const cards = ref([
  {
    id: 1,
    title: "Карточка №1",
    description: "Описание карточки №1",
    image: "card_1.webp",
    price: 15000
  },
  {
    id: 2,
    title: "Карточка №2",
    description: "Описание карточки №2",
    image: "card_2.jpg",
    price: 30000
  }
])

const colors = ref([
  {
    id: 1,
    name: "Ghost White",
    hex: "#F8F8FF"
  },
  {
    id: 2,
    name: "Light Steel Blue",
    hex: "#B0C4DE"
  },
  {
    id: 3,
    name: "Pale Green",
    hex: "#98FB98"
  },
  {
    id: 4,
    name: "Khaki",
    hex: "#F0E68C"
  },
  {
    id: 5,
    name: "Light Cyan",
    hex: "#E0FFFF"
  },
  {
    id: 6,
    name: "Lavender Blush",
    hex: "#FFF0F5"
  }
])

</script>

<template>
  <div class="main_container" :style="{ backgroundColor: bgColor }">
    <h2>Задание №{{ currentTask }}</h2>
    <div class="buttons_container">
      <button type="button" @click="currentTask = 1">Задание 1</button>
      <button type="button" @click="currentTask = 2">Задание 2</button>
      <button type="button" @click="currentTask = 3">Задание 3</button>
      <button type="button" @click="currentTask = 4">Задание 4</button>
    </div>
    <div class="items_container">
        <Container v-if="currentTask == 1" :propcards="cards"/>
        <Form v-if="currentTask == 2" />
        <Colors v-if="currentTask == 3" :colorsprop="colors"/>
        <Text v-if="currentTask == 4" />
    </div>
  </div>
</template>

<style scoped>
.main_container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.buttons_container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
