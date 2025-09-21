<template>
  <div
    class="group relative rounded-xl overflow-hidden bg-slate-800/60 ring-1 ring-white/10 shadow-lg cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    @click="$emit('click')"
  >
    <div class="aspect-[2/3] w-full bg-slate-700">
      <img
        v-if="posterUrl"
        class="w-full h-full object-cover object-center"
        :src="posterUrl"
        :alt="movie.title + ' poster'"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-slate-300">No Poster</div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80"></div>

      <div class="absolute top-2 left-2 rounded-full bg-yellow-500/90 text-slate-900 text-xs font-bold px-2 py-1 shadow">
        ⭐ {{ (movie.vote_average || 0).toFixed(1) }}
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4">
      <h2 class="text-base sm:text-lg font-semibold text-white drop-shadow line-clamp-2">
        {{ movie.title }}
      </h2>
      <p class="text-xs text-slate-300/80 mt-0.5">
        {{ releaseYear }} • {{ movie.runtime ? movie.runtime + 'm' : '' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  movie: { type: Object, required: true },
})
const posterUrl = computed(() => props.movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}` : '')
const releaseYear = computed(() => (props.movie?.release_date || '').slice(0, 4))
</script>