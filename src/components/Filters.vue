<template>
    <div class="filters">
        <select v-model="localFilters.day" @change="emitFilters">
            <option value="">Все дни</option>
            <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
        </select>
        <select v-model="localFilters.teacher" @change="emitFilters">
            <option value="">Все преподаватели</option>
            <option v-for="t in teachers" :key="t">{{ t }}</option>
        </select>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps(['selectedDay', 'selectedTeacher', 'teachers']);
const emit = defineEmits(['update-filters']);

const localFilters = reactive({ day: props.selectedDay, teacher: props.selectedTeacher });
const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function emitFilters() {
  emit('update-filters', { ...localFilters });
}
</script>