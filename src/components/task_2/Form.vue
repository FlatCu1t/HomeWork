<script setup>
    import { ref } from 'vue';

    const username = ref('');
    const userage = ref();
    const message = ref('');

    function submitForm() {
        userage.value <= 0 ? message.value = "Вы ввели возраст 0 или < 0, вы точно живой?"
        : userage.value < 10 && userage.value > 0 ? message.value = "Вы ввели возраст < 10, вы еще ребёнок"
        : userage.value >= 10 && userage.value < 14 ? message.value = "Вы ввели возраст > 10, но < 14, вы в раннем подростковом возрасте"
        : userage.value >= 14 && userage.value < 20 ? message.value = "Вы ввели возраст > 14, но < 20, вы в позднем подростковом возрасте"
        : userage.value >= 19 && userage.value < 120 ? message.value = "Вы ввели возраст > 19, вы уже взрослый"
        : userage.value >= 120 ? message.value = "Вы ввели возраст > 120, в принципе можно сказать, что вы йода"
        : null;
    }
</script>

<template>
    <div class="form_container">
        <form @submit.prevent="submitForm">
            <input type="text" placeholder="Имя" v-model="username" required>
            <input type="number" placeholder="Возраст" v-model.number="userage" required>
            <button type="submit">Отправить</button>
            <p v-if="message.length > 0">{{ message }}</p>
        </form>
    </div>
</template>

<style scoped>
    h2 {
        font-size: 32px;
        font-weight: 600;
    }

    .form_container {
        position: relative;
        left: 50%;
        top: 100px;
        transform: translateX(-50%);
        width: 300px;
        height: auto;
        background-color: black;
        border-radius: 12px;
        padding: 20px;
        padding-top: 50px;
    }

    .form_container form {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 30px;
        align-items: center;
        justify-content: center;
    }

    .form_container form input {
        width: 200px;
        height: 35px;
        padding-left: 10px;
        font-size: 18px;
        border: none;
        border-radius: 12px;

        &:hover {
            cursor: pointer;
        }
    }

    .form_container form button {
        position: relative;
        width: 150px;
        height: 50px;
    }

    .form_container p {
        color: red;
        font-size: 18px;
    }
</style>