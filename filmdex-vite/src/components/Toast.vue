<template>
  <transition name="fade">
    <div
      v-if="message"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-3 z-50"
    >
      <span>{{ message }}</span>
      <button class="bg-white text-red-600 px-2 py-1 rounded" @click="$emit('close')">Tutup</button>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({ message: { type: String, default: '' } })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>