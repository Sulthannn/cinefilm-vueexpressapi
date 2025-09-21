<template>
  <div class="flex flex-col items-center mb-6">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Cari film..."
      class="w-1/2 px-4 py-2 rounded-full border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-200 mb-2"
    />
    <label class="text-gray-300">
      Suggestion :
      <span
        v-for="s in suggested"
        :key="s.id"
        class="text-yellow-300 suggested cursor-pointer"
        @click="$emit('select', s.id)"
      >
        {{ s.title }} |
      </span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  suggested: { type: Array, default: () => [] },
})
</script>
