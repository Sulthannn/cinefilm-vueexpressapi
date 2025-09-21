<template>
  <transition name="fade">
    <div
      v-if="message"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-500/95 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 z-50 ring-1 ring-white/10 backdrop-blur"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white/90">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM10.5 8.25a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM12 10.5a.75.75 0 01.75.75v5.25a.75.75 0 11-1.5 0V11.25A.75.75 0 0112 10.5z" clip-rule="evenodd" />
      </svg>
      <span class="text-sm">{{ message }}</span>
      <button class="ml-2 bg-white/90 hover:bg-white text-red-600 px-2 py-1 rounded-md text-sm" @click="$emit('close')">Close</button>
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