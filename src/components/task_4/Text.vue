<script setup>
    import { ref } from 'vue';

    const message = ref('');
</script>

<template>
    <p v-if="message.length > 0" class="newMessage">{{ message }}</p>
    <p v-else class="newMessage">Тут будет новое сообщение</p>
    <label for="area">Напишите что нибудь</label>
    <br>
    <textarea name="area" placeholder="Текст..." v-model="message"></textarea>
</template>

<style scoped>
    h2 {
        font-size: 32px;
        font-weight: 600;
    }

    label {
        font-size: 20px;
        line-height: 80px;
    }

    textarea {
        width: 300px;
        height: 200px;
        resize: none;
        top: 100px;
        padding: 10px;
        font-size: 18px;
        font-weight: 400;
    }

    .newMessage {
        font-size: 20px;
        font-weight: 600;
        font-style: italic;
    }
</style>