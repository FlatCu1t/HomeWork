<script setup>
    import Cards from './Cards.vue';

    const props = defineProps({
        propcards: Array
    })
</script>

<template>
    <div class="items_container">
        <Cards :cards="propcards"/>
    </div>
</template>

<style scoped>
    h2 {
        font-size: 32px;
        font-weight: 600;
    }

    .items_container {
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -30%);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 50px;
        align-items: center;
        justify-content: center;
    }
</style>