<template>
  <div>
    <header class="relative">
      <div class="absolute inset-0 z-0">
        <img src="https://wallpapers.com/images/hd/zoom-background-q4y9fpc46ij6h8a2.jpg" alt="Background" class="w-full h-full object-cover object-center" />
      </div>
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center z-10 relative">
        <h1 class="text-3xl font-bold hover:font-black text-white">Filmdex</h1>
      </nav>
      <div class="container mx-auto flex justify-center items-center z-10 relative">
        <img src="/wb.png" alt="Warner Bros Logo" class="w-64 h-64 mb-6" />
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <h1 class="container mx-auto text-3xl font-black text-center text-yellow-300 mb-6 z-10">List Film</h1>

      <SearchBar v-model="search" :suggested="suggestedFilm" @select="goToDetail" />

      <section>
        <div v-if="!viewAsList">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 dark:bg-gray-700">
            <SkeletonCard v-if="isFetching && !movieList.length" v-for="n in 10" :key="'skel-'+n" />
            <MovieCard
              v-for="item in movieList"
              :key="item.id"
              :movie="item"
              @click="goToDetail(item.id)"
            />
          </div>
          <div class="flex justify-center my-6" v-if="isFetching">
            <div class="h-6 w-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-yellow-300 ml-3">Memuat...</span>
          </div>
          <div ref="sentinel" class="h-8"></div>
          <div v-if="!hasMore && movieList.length" class="text-center text-gray-400 my-4">Sudah semua.</div>
        </div>
        <div v-else>
          <MovieDetail :movie="selectedMovie" @back="viewAsList = false" />
        </div>
      </section>
    </main>

    <Toast :message="errorMessage" @close="errorMessage = ''" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import MovieCard from './components/MovieCard.vue'
import MovieDetail from './components/MovieDetail.vue'
import SearchBar from './components/SearchBar.vue'
import Toast from './components/Toast.vue'
import SkeletonCard from './components/SkeletonCard.vue'

const movieList = ref([])
const viewAsList = ref(false)
const selectedMovie = ref({})
const search = ref('')
const allFilms = ref([])
const suggestedFilm = ref([])
const page = ref(1)
const hasMore = ref(true)
const isFetching = ref(false)
const errorMessage = ref('')
const sentinel = ref(null)
const API_BASE = import.meta.env.VITE_API_BASE || ''

async function api(path) {
  const res = await fetch(path)
  if (!res.ok) {
    try {
      const data = await res.json()
      throw new Error(data?.error || `Request gagal: ${res.status}`)
    } catch (_) {
      const txt = await res.text().catch(() => '')
      throw new Error(txt || `Request gagal: ${res.status}`)
    }
  }
  return await res.json()
}

async function loadPage(pageNo = 1) {
  if (isFetching.value) return
  try {
    isFetching.value = true
  const data = await api(`${API_BASE}/api/discover/movie?with_genres=28&page=${pageNo}`)
    const results = data.results || []
    allFilms.value = [...allFilms.value, ...results]
    for (const movie of results) {
      await getEachMovie(movie)
    }
    if (data.page >= data.total_pages) {
      hasMore.value = false
    }
  } catch (e) {
    console.error(e)
    errorMessage.value = e?.message || 'Gagal memuat data'
  } finally {
    isFetching.value = false
  }
}

async function getEachMovie(movie) {
  try {
    const data = await api(`${API_BASE}/api/movie/${movie.id}?language=en-US`)
    movieList.value.push(data)
    movieList.value.sort((a, b) => a.title.localeCompare(b.title))
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Gagal memuat detail film'
  }
}

async function goToDetail(id) {
  try {
    viewAsList.value = true
    const data = await api(`${API_BASE}/api/movie/${id}?language=en-US`)
    selectedMovie.value = data
  } catch (e) {
    console.error(e)
    errorMessage.value = 'Gagal memuat detail film'
  }
}


const debouncedSearch = ref('')
let debounceTimer
watch(search, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = val
  }, 300)
})

watch(debouncedSearch, (val) => {
  const q = (val || '').toLowerCase()
  suggestedFilm.value = allFilms.value.filter((item) => item.title.toLowerCase().includes(q))
})

let observer
onMounted(() => {
  loadPage(page.value)
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore.value && !isFetching.value && !viewAsList.value) {
        page.value += 1
        loadPage(page.value)
      }
    })
  })
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>