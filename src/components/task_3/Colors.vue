<script setup>
    const props = defineProps({
        colorsprop: Array
    })
</script>

<template>
    <div class="colors_container">
        <div v-for="color in colorsprop" :key="color.id" class="color" :style="{ backgroundColor: color.hex }">
            <p>{{ color.name }}</p>
            <p>HEX: {{ color.hex }}</p>
        </div>
    </div>
</template>

<style scoped>
    h2 {
        font-size: 32px;
        font-weight: 600;
    }

    .colors_container {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 150px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 50px;
        row-gap: 30px;
        align-items: center;
        justify-content: center;
        max-width: 600px;
    }

    .colors_container .color {
        width: 200px;
        height: 200px;
    }

    .colors_container .color p {
        font-size: 18px;
        color: black;
        font-weight: 500;
        position: relative;
        left: 50%;
        top: 20%;
        transform: translate(-50%, -20%);
    }
</style>