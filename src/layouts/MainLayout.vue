<template>
  <div class="layout">
    <header>
      <h1>Shop</h1>
      <button @click="clearStorage">Выход</button>
    </header>
    <main class="main">
      <section class="adminSection" v-if="admin">
        <h2>Добавление карточки</h2>
        <div class="inputs">
          <input type="text" placeholder="cardTitle" v-model="cardTitle">
          <input type="text" placeholder="cardDescription" v-model="cardDescription">
          <input type="text" placeholder="cardIMG" v-model="cardIMG">
          <button class="addButton" @click="addCard">Добавить</button>
        </div>
      </section>
      <section>
        <RouterView :cards="cards" :idCounter="idCounter" @removeCard="removeCard" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import admins from '../data/admins.json'
import router from "../router/index.js";

const cards = ref([])
const idCounter = ref(0)
const cardTitle = ref('')
const cardDescription = ref('')
const cardIMG = ref('')

function addCard() {
  if (cardTitle.value.length < 1 || cardDescription.value.length < 1) return;
  cards.value.push({
    cardID: idCounter.value++,
    cardTitle: cardTitle.value,
    cardDescription: cardDescription.value,
    cardIMG: cardIMG.value
  })
}

function removeCard(id) {
  cards.value = cards.value.filter((card) => card.cardID !== id)
}

function clearStorage() {
  localStorage.clear()
  router.push('/reg')
}

const admin = admins.admins.find((element) => element === localStorage.getItem("user"));
</script>