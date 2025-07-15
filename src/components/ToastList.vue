<template>
  <div class="toast-container">
    <Toast
      v-for="toast in visibleToasts"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
      :duration="toast.duration"
      :permanent="toast.permanent"
      @close="removeToast"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Toast from './Toast.vue';

const props = defineProps({
    toasts: { type: Array, required: true }
});

const emit = defineEmits(['close']);

const maxVisible = 4;
const visibleToasts = computed(() => props.toasts.slice(0, maxVisible));

function removeToast(id) {
    emit('close', id);
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
}
</style>