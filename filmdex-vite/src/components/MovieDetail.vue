<template>
  <div class="flex max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <div class="flex w-full">
      <div class="w-1/2">
        <img class="w-full h-auto object-cover" :src="posterUrl" alt="Movie Poster" />
      </div>
      <div class="w-1/2 flex flex-col justify-between p-6">
        <div>
          <h2 class="text-2xl font-extrabold text-yellow-300">{{ movie.title }}</h2>
          <p class="text-sm text-gray-300 mt-2">Genre:</p>
          <span v-for="genre in movie.genres" :key="genre.id || genre.name" class="inline-block border border-gray-300 hover:bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 hover:text-gray-800 mr-2 mb-2">{{ genre.name }}</span>
          <p class="text-sm text-gray-300 mt-2">Rilis: {{ movie.release_date }}</p>
          <p class="text-gray-300 mt-4">{{ movie.overview }}</p>
        </div>
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white hover:text-gray-800 font-bold py-2 px-4 rounded mt-4 self-end" @click="$emit('back')">Kembali</button>
      </div>
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
