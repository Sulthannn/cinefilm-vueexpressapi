<template>
  <div class="relative max-w-2xl">
    <div class="flex items-center rounded-xl bg-white/90 focus-within:ring-2 focus-within:ring-yellow-400 shadow px-3 sm:px-4 py-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-slate-500">
        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 015.362 10.79l3.299 3.299a.75.75 0 11-1.06 1.06l-3.3-3.298A6.75 6.75 0 1110.5 3.75zm0 1.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z" clip-rule="evenodd" />
      </svg>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search..."
        class="flex-1 bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none px-3 sm:px-4 py-1"
      />
    </div>
    <div v-if="suggested && suggested.length" class="absolute z-20 mt-2 w-full rounded-xl bg-slate-800/95 ring-1 ring-white/10 shadow-lg overflow-hidden">
      <ul>
        <li
          v-for="s in suggested.slice(0, 8)"
          :key="s.id"
          class="px-4 py-2 text-slate-200 hover:bg-slate-700/60 cursor-pointer truncate"
          @click="$emit('select', s.id)"
        >
          {{ s.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  suggested: { type: Array, default: () => [] },
})
</script>