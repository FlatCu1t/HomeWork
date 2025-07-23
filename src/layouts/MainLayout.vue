<template>
  <div class="layout">
    <header class="header">
      <h1>КиноКаталог</h1>
      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/movies">Фильмы</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>