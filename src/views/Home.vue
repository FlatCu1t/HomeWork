<template>
  <div class="home">
    <div v-for="card in cards.cards" :key="card.cardID" class="card">
      <p class="cardTitle">{{ card.cardTitle }}</p>
      <p class="cardDesc">{{ card.cardDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import cards from '../data/cards.json'
</script>

<style>
.home {
  position: relative;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: max-content;
  max-width: 90vw;
  height: auto;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 50px;

  .card {
    position: relative;
    width: 200px;
    height: 300px;
    border-radius: 12px;
    background-color: #1c1c1c;
    transition: transform 0.35s ease-in-out;

    .cardTitle, .cardDesc {
      font-size: 18px;
      align-self: center;
      justify-self: center;
    }

    .cardTitle {
      font-weight: 600;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>