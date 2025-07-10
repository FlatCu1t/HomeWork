<template>
    <form @submit.prevent="submit" class="course-form">
        <input v-model="form.title" placeholder="Название" required />
        <input v-model="form.teacher" placeholder="Преподаватель" required />
        <select v-model="form.day" required>
            <option disabled value="">Выберите день</option>
            <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
        </select>
        <input type="time" v-model="form.start" required />
        <input type="time" v-model="form.end" required />
        <button type="submit">{{ form.id ? 'Обновить' : 'Добавить' }}</button>
    </form>
</template>

<script setup>
import { watch, reactive } from 'vue';

const props = defineProps(['editingCourse']);
const emit = defineEmits(['save']);

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const form = reactive({ title: '', teacher: '', day: '', start: '', end: '', id: null });

watch(() => props.editingCourse, (val) => {
  if (val) Object.assign(form, val);
}, { immediate: true });

function submit() {
  emit('save', { ...form });
  form.title = form.teacher = form.day = form.start = form.end = '';
  form.id = null;
}
</script>