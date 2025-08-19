<template>
  <div class="form_container">
    <form action="">
      <input type="text" placeholder="Name" v-model="searchUser" required>
      <input type="password" placeholder="Password" v-model="pass" required>
      <button type="submit" v-if="type" @click.prevent="addUser">Registration</button>
      <button type="submit" v-else @click.prevent="auth">Authorization</button>

      <p v-if="type" @click="$emit('changeType')">Have account? Auth here.</p>
      <p v-else @click="$emit('changeType')">Don't account? Register here.</p>

      <p class="error" v-if="error.err">{{ error.message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from "../router/index.js";
const store = useStore()

const props = defineProps({
  type: Boolean
})
const emits = defineEmits(
    ["changeType"]
)

const searchUser  = ref('')
const pass = ref('')
const error = ref({ err: false, message: '' })
const timeOut = ref()

const addUser = () => {
  const name = searchUser.value.trim()
  const password = pass.value

  const user = store.getters['users/getUserByName'](name)
  if (!user) {
    store.dispatch('users/addUser', { name, password })
    emits('changeType')
    searchUser.value = ''
    pass.value = ''
  } else {
    showError('Такой пользователь уже существует.')
  }
}

function showError(message) {
  error.value.err = true;
  error.value.message = message;

  timeOut.value = setTimeout(() => {
    error.value.err = false;
    error.value.message = '';
  }, 3000)
}

function auth() {
  const name = searchUser.value.trim()
  const user = store.getters['users/getUserByName'](name)

  if (!user) {
    showError('Такого пользователя не существует.')
    return
  }
  if (pass.value !== user.password) {
    showError('Неверный пароль.')
    return
  }

  localStorage.setItem('user', user.name)
  router.push('/')
  searchUser.value = ''
  pass.value = ''
}
</script>