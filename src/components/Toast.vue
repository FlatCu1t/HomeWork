<template>
  <div class="toast">
    <span>{{ message }}</span>
    <button @click="closeToast">Закрыть</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    id: { type: Number, required: true },
    message: { type: String, required: true },
    duration: { type: Number, default: 5000 },
    permanent: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);
let timer = null;

function closeToast() {
    emit('close', props.id);
}

onMounted(() => {
    if (!props.permanent) {
        timer = setTimeout(() => {
            closeToast();
        }, props.duration);
    }
});

onUnmounted(() => {
    if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.toast {
  background: #333;
  color: #fff;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}
</style>