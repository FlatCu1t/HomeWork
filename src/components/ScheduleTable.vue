<template>
    <div class="schedule">
        <div v-for="day in days" :key="day" class="schedule-day">
            <h2>{{ day }}</h2>
            <div>
                <CourseCard
                v-for="course in dayCourses(day)"
                :key="course.id"
                :course="course"
                @edit="emit('edit', course)"
                @delete="emit('delete', course.id)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import CourseCard from './CourseCard.vue';

const props = defineProps(['courses']);
const emit = defineEmits(['edit', 'delete']);

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

function dayCourses(day) {
  return props.courses.filter(c => c.day === day).sort((a, b) => a.start.localeCompare(b.start));
}
</script>