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

<style>
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  header {
    width: 100%;
    height: 10vh;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;

    h1 {
      font-size: 32px;
    }

    button {
      position: absolute;
      width: 120px;
      height: 35px;
      border: none;
      border-radius: 8px;
      font-size: 18px;
      left: 80%;
      transform: translateX(-80%);

      &:hover {
        cursor: pointer;
      }
    }
  }

  .adminSection {
    width: 100%;
    height: 30vh;
    position: relative;

    h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 10px;
      font-size: 24px;
    }

    .inputs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 80px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 30px;

      input {
        width: 250px;
        height: 40px;
        border: none;
        border-radius: 10px;
        padding-left: 10px;
        font-size: 18px;
      }

      button {
        width: 150px;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-size: 20px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>