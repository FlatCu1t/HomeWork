<template>
  <RouterView />
</template>

<script setup>
import router from "./router/index.js";

const user = localStorage.getItem("user");

if(!user) {
  router.push("/reg");
}
</script>