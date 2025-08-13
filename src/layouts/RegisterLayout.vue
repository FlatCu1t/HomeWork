<template>
  <div class="layout">
    <header>
      <h1 v-if="registration">Registration</h1>
      <h1 v-else>Authorization</h1>
    </header>
    <main class="main">
      <RouterView :type="registration" @changeType="changeType" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const registration = ref(true)

function changeType() {
  registration.value = !registration.value
}
</script>

<style>
.layout {
  width: 100%;
  height: 100%;
  position: relative;

  header {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
      font-size: 32px;
    }
  }
}
</style>