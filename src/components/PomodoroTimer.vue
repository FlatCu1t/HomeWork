<template>
    <div class="pomodoro">
        <div class="header">
        <label for="mode-select">Режим: </label>
        <select id="mode-select" v-model="mode">
            <option value="work">Работа</option>
            <option value="break">Отдых</option>
        </select>
    </div>
    <div class="display">
        <span class="label">{{ modeLabel }}</span>
        <span class="time">
            {{ minutes.toString().padStart(2, '0') }} :
            {{ seconds.toString().padStart(2, '0') }}
        </span>
        </div>
        <div class="controls">
            <button @click="start" :disabled="running">Старт</button>
            <button @click="pause" :disabled="!running">Пауза</button>
            <button @click="reset">Сброс</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

const WORK_MIN = 25;
const BREAK_MIN = 5;

const mode = ref('work');
const minutes = ref(WORK_MIN);
const seconds = ref(0);
const running = ref(false);
let intervalId = null;

const modeLabel = computed(() => (mode.value === 'work' ? 'Работа' : 'Отдых'));

function resetTimerValues() {
    if (mode.value === 'work') {
        minutes.value = WORK_MIN;
    } else {
        minutes.value = BREAK_MIN;
    }
    seconds.value = 0;
}

function tick() {
    if (seconds.value > 0) {
        seconds.value--;
    } else if (minutes.value > 0) {
        minutes.value--;
        seconds.value = 59;
    } else {
        running.value = false;
    }
}

function start() {
    if (!running.value) {
        running.value = true;
    }
}

function pause() {
    running.value = false;
}

function reset() {
    running.value = false;
    resetTimerValues();
}

onMounted(() => {
    watch(mode, () => {
            reset();
    });

    watch(running, (newVal) => {
        if (newVal) {
            intervalId = setInterval(tick, 1000);
        } else if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.pomodoro {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 4px;
  text-align: center;
  width: 250px;
}
.header {
  margin-bottom: 0.5rem;
}
.display {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}
.controls button {
  margin: 0 0.25rem;
  padding: 0.25rem 0.5rem;
}
</style>