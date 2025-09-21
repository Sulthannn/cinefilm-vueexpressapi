<template>
  <div class="bg-gray-800 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer" @click="$emit('click')">
    <img class="w-full object-cover object-center" :src="posterUrl" :alt="movie.title + ' poster'" />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2 text-yellow-300">{{ movie.title }}</h2>
      <p class="text-gray-300 dark:text-gray-400">{{ movie.tagline }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  movie: { type: Object, required: true },
})
const posterUrl = computed(() => `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`)
</script>
