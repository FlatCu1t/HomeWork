<template>
    <div class="course-card">
        <div>
            <div class="title">{{ course.title }}</div>
            <div class="info">{{ course.teacher }} ({{ course.start }} - {{ course.end }})</div>
        </div>
        <div class="actions">
            <button @click="$emit('edit')">✏️</button>
            <button @click="$emit('delete')">🗑️</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['course']);
</script>