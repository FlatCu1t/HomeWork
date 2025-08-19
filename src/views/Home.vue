<template>
  <div class="home">
    <div v-for="card in cards" :key="card.cardID" class="card">
      <div class="content">
        <img v-if="card.cardIMG" :src="card.cardIMG" loading="lazy" alt="card icon">
        <p class="cardTitle">{{ card.cardTitle }}</p>
        <p class="cardDesc">{{ card.cardDescription }}</p>
        <button @click="removeCard(card.cardID)">Удалить</button>
      </div>
    </div>
  </div>
  <div class="empty"></div>
</template>

<script setup>
const props = defineProps({
  cards: Array,
  idCounter: Number
})

const emits = defineEmits(['removeCard'])

function removeCard(id) {
  emits('removeCard', id)
}

</script>