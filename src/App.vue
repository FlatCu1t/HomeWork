<script setup>
import { ref, computed } from 'vue';
import CourseForm from './components/CourseForm.vue';
import ScheduleTable from './components/ScheduleTable.vue';
import Filters from './components/Filters.vue';

const courses = ref([]);
const editingCourse = ref(null);
const filters = ref({ teacher: '', day: '' });

const teachers = computed(() => [...new Set(courses.value.map(c => c.teacher))]);

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    return (!filters.value.teacher || course.teacher === filters.value.teacher) &&
           (!filters.value.day || course.day === filters.value.day);
  });
});

function saveCourse(course) {
  if (course.id) {
    const idx = courses.value.findIndex(c => c.id === course.id);
    courses.value[idx] = { ...course };
  } else {
    courses.value.push({ ...course, id: Date.now() });
  }
  editingCourse.value = null;
}

function editCourse(course) {
  editingCourse.value = { ...course };
}

function deleteCourse(id) {
  if (confirm('Вы уверены, что хотите удалить курс?')) {
    courses.value = courses.value.filter(c => c.id !== id);
  }
}

function updateFilters(newFilters) {
  filters.value = { ...filters.value, ...newFilters };
}
</script>

<template>
  <div class="app">
    <h1>📘 Планировщик курсов</h1>
    <Filters
      :selectedDay="filters.day"
      :selectedTeacher="filters.teacher"
      :teachers="teachers"
      @update-filters="updateFilters"
    />
    <CourseForm :editingCourse="editingCourse" @save="saveCourse" />
    <ScheduleTable
      :courses="filteredCourses"
      @edit="editCourse"
      @delete="deleteCourse"
    />
  </div>
</template>