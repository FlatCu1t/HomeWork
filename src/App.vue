<template>
  <div>
    <textarea id="notText" type="text" placeholder="Текст уведомления" v-model="toastMessage"></textarea>
    <br>
    <br>
    <input id="notDuration" type="text" placeholder="Длительность уведомления" v-model="toastDuration">
    <br>
    <br>
    <label for="inp_check">Пермач? </label>
    <input name="inp_check" type="checkbox" v-model="toastPermanent">
  </div>
  <button @click="addToast">Добавить уведомление</button>
  <ToastList :toasts="toasts" @close="handleClose" />

  <hr />

    <button @click="addPomodoro">Новая сессия Pomodoro</button>
    <div class="pomodoro-list">
      <PomodoroTimer
        v-for="id in pomodoroIds"
        :key="id"
      />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ToastList from './components/ToastList.vue';
import PomodoroTimer from './components/PomodoroTimer.vue';

let nextId = 1;
const toasts = ref([]);
const toastMessage = ref('');
const toastPermanent = ref(false);
const toastDuration = ref(3000);

function addToast() {
  const message = toastMessage.value || `Уведомление #${nextId}`;
  const duration = toastDuration.value;
  const permanent = toastPermanent.value;
  toasts.value.push({ id: nextId++, message, duration, permanent });
}

function handleClose(id) {
  toasts.value = toasts.value.filter(t => t.id !== id);
}


let nextPomodoroId = 1;
const pomodoroIds = ref([]);
function addPomodoro() {
  pomodoroIds.value.push(nextPomodoroId++);
}

</script>

<style>
button {
  margin: 1rem;
  padding: 0.5rem 1rem;
}

#notText {
  width: 250px;
  height: 80px;
  border-radius: 7px;
  padding: 10px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  resize: none;
}

#notDuration {
  width: 250px;
  height: 30px;
  border-radius: 7px;
  border: none;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 500;
}

.pomodoro-list {
  display: flex;
  flex-wrap: wrap;
}
</style>