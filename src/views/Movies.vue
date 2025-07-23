<template>
  <div class="movies">
    <h2>Список фильмов</h2>
    <ul class="movie-list">
      <li v-for="movie in movies" :key="movie.id">
        <RouterLink :to="`/movies/${movie.id}`">{{ movie.title }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { movies } from '../data/movies'
</script>