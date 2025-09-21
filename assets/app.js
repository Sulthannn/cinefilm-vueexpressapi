import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      movieList: [],
      viewAsList: false,
      selectedMovie: {},
      search: '',
      allFilms: [],
      suggestedFilm: [],
    };
  },
  methods: {
  async logMovies() {
      try {
        const response = await fetch('/api/discover/movie?with_genres=28');
        const data = await response.json();
        const results = data.results || [];

        results.forEach((movie) => {
          this.getEachMovie(movie);
        });
      } catch (err) {
        console.error('Failed to fetch movies', err);
      }
    },
  async getEachMovie(movie) {
      try {
        const response = await fetch(`/api/movie/${movie.id}?language=en-US`);
        const data = await response.json();
        this.movieList.push(data);
        this.movieList.sort((a, b) => a.title.localeCompare(b.title));
      } catch (err) {
        console.error('Failed to fetch movie details', err);
      }
    },
  async goToDetail(movieId) {
      try {
        this.viewAsList = true;
        const response = await fetch(`/api/movie/${movieId}?language=en-US`);
        const data = await response.json();
        this.selectedMovie = data;
      } catch (err) {
        console.error('Failed to fetch movie detail', err);
      }
    },
  async getAllMovie() {
      try {
        const response = await fetch('/api/discover/movie?with_genres=28');
        const data = await response.json();
        const result = data.results || [];
        this.allFilms = result;
      } catch (err) {
        console.error('Failed to fetch all movies', err);
      }
    },
  },
  watch: {
    search() {
      const filteredMovie = this.allFilms.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
      this.suggestedFilm = filteredMovie;
    },
  },
  mounted() {
    this.logMovies();
    this.getAllMovie();
  },
}).mount('#app');
