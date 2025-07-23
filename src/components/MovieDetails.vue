<template>
  <div v-if="movie" class="movie-details">
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.description }}</p>
  </div>
  <div v-else>
    <p>Фильм не найден.</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { movies } from '../data/movies'

const route = useRoute()
const movie = computed(() => movies.find(m => m.id === route.params.id))
</script>