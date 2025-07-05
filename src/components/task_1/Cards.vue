<script setup>
    const props = defineProps({
        cards: Array
    })
</script>

<template>
    <div v-for="card in cards" :key="card.id" class="card">
        <img :src="card.image" :alt="'card_img_' + card.id" loading="lazy">
        <p>{{ card.title }}</p>
        <p>{{ card.description }}</p>
        <p>Цена: {{ card.price }}</p>
    </div>
</template>

<style scoped>
    .card {
        width: 200px;
        height: 300px;
        border-radius: 12px;
        box-sizing: border-box;
        transition: transform 0.35s ease-in-out;
        box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.5);

        &:hover {
            transform: scale(1.05);
        }
    }

    .card img {
        position: absolute;
        width: inherit;
        height: inherit;
        object-fit: cover;
        object-position: center;
        display: block;
        border-radius: 12px;
        opacity: 0.4;
    }

    .card p {
        position: relative;
        font-size: 18px;
        font-weight: 500;
    }
</style>