<template>
  <div class="layout">
    <header>
      <h1>Shop</h1>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import admins from '../data/admins.json'

const admin = admins.admins.find((element) => element === localStorage.getItem("user"));
</script>

<style>
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  header {
    width: 100%;
    height: 10vh;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
      font-size: 32px;
    }
  }
}
</style>