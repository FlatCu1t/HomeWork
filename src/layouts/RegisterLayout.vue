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