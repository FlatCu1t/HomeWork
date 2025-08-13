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
import { ref, computed } from 'vue'
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

<style>
.form_container {
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.5);
  padding: 10px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;

    input {
      width: 200px;
      height: 15px;
      border-radius: 8px;
      font-size: 18px;
      padding: 10px;
      border: none;
    }

    button {
      width: 150px;
      height: 40px;
      border-radius: 8px;
      border: none;
      transition: transform 0.35s ease-in-out;
      font-size: 18px;

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    p {
      font-size: 18px;
      text-align: center;
      text-wrap: nowrap;
      color: rgba(0, 0, 0, 0.75);
      font-weight: 500;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .error {
    color: red !important;
  }
}
</style>