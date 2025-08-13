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
    min-width: 200px;
    max-width: 600px;
    height: auto;
    border-radius: 12px;
    background-color: #1c1c1c;
    transition: transform 0.35s ease-in-out;

    .content {
      width: inherit;
      height: inherit;
      padding: 15px;
      box-sizing: border-box;
      border-radius: inherit;

      img {
        max-width: 600px;
        height: 100%;
      }

      button {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 30px;
        border: none;
        border-radius: 10px;
        margin-top: 20px;
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.65);

        &:hover {
          cursor: pointer;
        }
      }
    }

    .cardTitle, .cardDesc {
      margin-top: 20px;
      font-size: 18px;
      align-self: center;
      justify-self: center;
      text-align: center;
    }

    .cardTitle {
      font-weight: 600;
    }

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}

.empty {
  width: 100%;
  height: 300px;
}
</style>