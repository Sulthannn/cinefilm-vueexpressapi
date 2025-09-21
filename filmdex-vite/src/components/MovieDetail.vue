<template>
  <section class="relative isolate overflow-hidden rounded-2xl">
    <div class="absolute inset-0 -z-10">
      <img
        v-if="backdropUrl"
        :src="backdropUrl"
        alt="Backdrop"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900"></div>
    </div>

    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[320px,1fr] gap-6 md:gap-10 p-4 sm:p-6 md:p-8">
      <div class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-900/40 shadow">
        <img class="w-full h-full object-cover" :src="posterUrl" alt="Movie Poster" />
      </div>

      <div class="flex flex-col">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
            {{ movie.title }}
          </h2>
          <p class="mt-1 text-slate-300/90 text-sm">
            {{ year }} • Rating ⭐ {{ (movie.vote_average || 0).toFixed(1) }} • {{ movie.runtime }} minute
          </p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="genre in movie.genres" :key="genre.id || genre.name" class="inline-flex items-center rounded-full bg-slate-800/70 ring-1 ring-white/10 text-slate-200 text-xs px-3 py-1">
              {{ genre.name }}
            </span>
          </div>

          <p class="mt-4 text-slate-200 leading-relaxed">
            {{ movie.overview }}
          </p>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="text-slate-300 text-sm">
            Release: <span class="font-medium text-slate-200">{{ movie.release_date }}</span>
          </div>
          <button
            class="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg shadow"
            @click="$emit('back')"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  movie: { type: Object, required: true },
})
const posterUrl = computed(() => props.movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}` : '')
const backdropUrl = computed(() => props.movie?.backdrop_path ? `https://image.tmdb.org/t/p/w1280/${props.movie.backdrop_path}` : '')
const year = computed(() => (props.movie?.release_date || '').slice(0, 4))
</script>